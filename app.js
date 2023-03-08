import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { rateLimit } from 'express-rate-limit'
import compression from 'compression'
import dotenv from 'dotenv'
import { parseFile, selectCover } from 'music-metadata';
dotenv.config({ path: './.env' })
import fs from 'graceful-fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import sharp from 'sharp'
import { fileTypeFromBuffer } from 'file-type';
import { isAudioFile, randomNbLtID, sanitize, ThroughDirectory } from './utils.js';

const app = express();

const FRONT_URL = process.env.NODE_ENV !== 'production' ? process.env.DEV_FRONT_URL : process.env.FRONT_URL
const SERVER_URL = process.env.NODE_ENV !== 'production' ? process.env.DEV_SERVER_URL : process.env.SERVER_URL
const MUSICS_ROUTE = process.env.NODE_ENV !== 'production' ? process.env.LOCAL_MUSICS_ROUTE : process.env.ONLINE_MUSICS_ROUTE

app.use(cors({
    'credentials': true,
    'origin': FRONT_URL,
    "Access-Control-Allow-Origin": '*',
    'allowedHeaders': ['Content-Length', 'Content-Type', 'application', 'Authorization'],
    'methods': 'GET, POST, PUT',
    'preflightContinue': false,
}))

app.use(helmet({
    crossOriginEmbedderPolicy: false,
    // crossOriginResourcePolicy: false,
    crossOriginResourcePolicy: {
        allowOrigins: ['*']
    },
    originAgentCluster: true
}))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https: data:"],
            "default-src": ["*"]
        }
    })
);
app.use(express.json({ limit: '150kb' }))
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '150kb'
}))
app.use(bodyParser.json({ limit: '150kb' }))

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 150,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too Many Request from this IP, your IP has been blocked. Please try again later.'
})

app.use(compression())

/**
 * 
 */

app.use('/musics', limiter, express.static(MUSICS_ROUTE))
app.use('/albums', express.static('./albums-compressed'))

const isToken = (req, res, next) => {
    if (req.get('Authorization') === process.env.ACCESS_TOKEN) {
        res
        res.flush()
        next()
    } else {
        return res.status(400).json({ error: 'Vous devez posséder un Token secret pour accéder à cette requête.' })
    }
}

app.use('/playlists', isToken, express.static('./playlists'))
app.use('/datas', isToken, express.static('./data/datas.json'))

const router = express.Router()

router.get('/api/fetch-playlists', isToken, (req, res) => {
    fs.readdir('./playlists', (err, files) => {
        if (err) {
            console.log(err);
        } else {
            res.send(files)
        }
    })
})

router.post('/api/add-playlist', isToken, (req, res) => {
    const { playlist } = req.body
    fs.writeFile(`./playlists/${playlist._id}.json`, JSON.stringify(playlist), err => {
        if (err)
            console.error(err);
        else {
            return res.status(200).end()
        }
    });
})

router.put('/api/update-playlist', isToken, (req, res) => {
    const { playlist } = req.body
    fs.unlinkSync(`./playlists/${playlist._id}.json`, err => {
        if (err)
            return res.status(400).json({ error: 'Une erreur est survenue' })
    })
    fs.writeFile(`./playlists/${playlist._id}.json`, JSON.stringify(playlist), err => {
        if (err)
            return res.status(400).json({ error: 'Une erreur est survenue' })
        else {
            return res.status(200).end()
        }
    });
})

router.put('/api/delete-playlist', isToken, (req, res) => {
    const { playlist } = req.body
    fs.unlinkSync(`./playlists/${playlist._id}.json`, err => {
        if (err)
            return res.status(400).json({ error: 'Une erreur est survenue' })
        else return res.status(200).end()
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, `./build/`)))

    router.get('/', (_, res) => {
        res.sendFile(path.join(__dirname, 'index.html'))
    });
}

app.use('/', router)

/**
 * 
 */

if (process.env.NODE_ENV !== 'production') {
    let files = [];
    const ReadMusicDirectories = (directory) => {
        fs.readdirSync(directory).forEach(File => {
            const absolute = path.join(directory, File);
            if (fs.statSync(absolute).isDirectory()) {
                return ReadMusicDirectories(absolute)
            } else {
                if (isAudioFile(absolute)) {
                    return files.push(absolute)
                } else {
                    return
                };
            }
        });
        return files
    }

    app.get('/create/datas', async (req, res) => {
        const dirname = `${MUSICS_ROUTE}`
        let array = ReadMusicDirectories(dirname)
        let arr = []
        const response = array.map(async (file, i) => {
            const { common, format } = await parseFile(file);
            const unNeededProps = [
                'track', 'disk', 'encodersettings', 'movementIndex', 'tagTypes',
                'lossless', 'numberOfChannels', 'tool', 'codecProfile', 'bitrate',
                'numberOfSamples', 'bitrate', 'compilation', 'gapless', 'bpm', 'tvSeason',
                'tvEpisode', 'stik', 'creationTime', 'bitsPerSample', 'creationTime',
                'modificationTime', 'barcode', 'composer', 'trackGain', 'sampleRate',
                'averageLevel', 'compilation', 'channels', 'samplingFrequency'
            ]

            unNeededProps.forEach(prop => {
                if (common[prop]) {
                    delete common[prop]
                } else if (format[prop]) {
                    delete format[prop]
                }
            })

            if (format?.duration) {
                let duration = (Math.round(format.duration * 100) / 100).toFixed(1)
                format.duration = Number(duration)
            }

            const title = file.substring(file.lastIndexOf("\\") + 1, file.lastIndexOf("."))
            const musicPath = file.replace(MUSICS_ROUTE, '')
            const url = `${SERVER_URL}/musics/${musicPath}`

            let pictureLocalPath = null
            let pictureServerPath = null
            const cover = selectCover(common?.picture)

            if (!fs.existsSync(`${__dirname}/albums`)) {
                fs.mkdirSync(`${__dirname}/albums`, { recursive: true })
            }

            if (cover) {
                let data = cover.data
                const img = Buffer.from(data);
                let album_title = null

                if (Buffer.isBuffer(img)) {
                    if (common.album && common.artist) {
                        const album_path = `${__dirname}/albums/${common.artist}`
                        album_title = sanitize(common.album).trim().toLowerCase().replace(/ +/g, " ").replace(/ /g, "-")

                        await fileTypeFromBuffer(img)
                            .then(res => {
                                const { ext } = res
                                pictureServerPath = `${SERVER_URL}/albums/${common.artist}/${album_title}.${ext}`
                                pictureLocalPath = `${__dirname}/albums/${common.artist}/${album_title}.${ext}`

                                if (!fs.existsSync(pictureLocalPath)) {
                                    fs.mkdirSync(album_path, { recursive: true })
                                    fs.writeFileSync(pictureLocalPath, img, err => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    })
                                }
                            })
                    }
                }
            }

            if (common?.picture) {
                delete common.picture
            }

            arr.push({
                _id: randomNbLtID(24),
                url: url,
                title: title,
                metadatas: pictureServerPath ? { common: { ...common, picture: pictureServerPath }, format } : { common, format }
            })

            if (arr.length === array.length) {
                fs.appendFile(`./data/datas.json`, JSON.stringify(arr),
                    (err) => {
                        if (err) throw err;
                    });
                files = []
            }
        })
        Promise.all(response).then(() => {
            const picturesFolders = ThroughDirectory(`${__dirname}/albums`)
            picturesFolders.map((picture, i) => {
                let pathPortions = picture.split('\\')
                const __directory = pathPortions[pathPortions.length - 2]
                const filename = picture.substring(picture.lastIndexOf("\\") + 1, picture.lastIndexOf("."))

                if (!fs.existsSync(`${__dirname}/albums-compressed/${__directory}`)) {
                    fs.mkdirSync(`${__dirname}/albums-compressed/${__directory}`, { recursive: true })
                }

                const extension = path.extname(picture)

                sharp(picture, { failOn: 'none' })
                    .jpeg()
                    .toFile(`${__dirname}/albums-compressed/${__directory}/${filename}${extension}`,
                        (err) => {
                            if (err) console.error(err)
                        })

                if (i === picturesFolders.length + 1) {
                    fs.rmSync(`${__dirname}/albums`, { recursive: true, force: true })
                    fs.renameSync(`${__dirname}/albums-compressed`, `${__dirname}/albums`)
                }
            })
        })
    })
}

/**
 * 
 */

if (process.env.NODE_ENV !== 'production') {
    process.once('uncaughtException', err => {
        console.error(err.stack || err)
        setTimeout(() => process.exit(1), 100)
    })
}

const PORT = process.env.PORT || 5002

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`)
})