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
    'methods': 'GET',
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
app.use(express.json({ limit: '15kb' }))
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '15kb'
}))
app.use(bodyParser.json({ limit: '15kb' }))

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 150,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too Many Request from this IP, your IP has been blocked. Please try again later.'
})

app.use(limiter)
app.use(compression())

app.use('/musics', express.static(MUSICS_ROUTE))
app.use('/albums', express.static('./albums-compressed'))

const router = express.Router()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, `./build/`)))

    router.get('/', (_, res) => {
        res.sendFile(path.join(__dirname, 'index.html'))
    });
}

const stream = (pathToZip) => {
    return (req, res, next) => {
        const readableStream = fs.createReadStream(pathToZip, null);
        readableStream.pipe(res)
        next();
    }
};

router.get('/datas', stream('./data/datas.json'), (req, res) => {
    if (req.get('Authorization') === process.env.ACCESS_TOKEN) {
        res
        res.flush()
    } else {
        return res.status(400).json({ error: 'Vous devez posséder un Token secret pour accéder à cette requête.' })
    }
});

app.use('/', router)

/**
 * 
 */

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
        const unNeedProps = ['track', 'disk', 'encodersettings', 'movementIndex', 'tagTypes', 'lossless', 'numberOfChannels', 'tool', 'codecProfile', 'bitrate', 'numberOfSamples', 'bitrate']

        unNeedProps.forEach(prop => {
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
        const url = file.substring(file.lastIndexOf(MUSICS_ROUTE), file.length)

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
        return arr
    })
    Promise.all(response).then(res => {
        const picturesFolders = ThroughDirectory(`${__dirname}/albums`)
        picturesFolders.map(picture => {
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
        })
    })
})

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