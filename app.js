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
import { isAudioFile, randomNbLtID } from './utils.js';

const app = express();

const FRONT_URL = process.env.NODE_ENV !== 'production' ? process.env.DEV_FRONT_URL : process.env.FRONT_URL

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


if (process.env.NODE_ENV !== 'production') {
    app.use('/musics', express.static(process.env.LOCAL_MUSICS_ROUTE))
} else {
    app.use('/musics', express.static(process.env.ONLINE_MUSICS_ROUTE))
}

const isToken = (req, res, next) => {
    if (req.get('Authorization') === process.env.ACCESS_TOKEN) {
        res
        res.flush()
        next()
    } else {
        return res.status(400).json({ error: 'Vous devez posséder un Token secret pour accéder à cette requête.' })
    }
}

app.use('/datas', isToken, express.static('./data.json'))

const router = express.Router()

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

let files = [];
const ThroughDirectory = (directory) => {
    fs.readdirSync(directory).forEach(File => {
        const absolute = path.join(directory, File);
        if (fs.statSync(absolute).isDirectory()) {
            return ThroughDirectory(absolute)
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
    const dirname = 'C:/Users/Alex/Downloads/Andy'
    let array = ThroughDirectory(dirname)
    let arr = []
    const response = array.map(async (file, i) => {
        const { common, format } = await parseFile(file);
        // if (common?.picture) {
        //     delete common.picture
        // }
        let title = file.substring(file.lastIndexOf("\\") + 1, file.lastIndexOf("."))

        arr.push(JSON.stringify({
            _id: randomNbLtID(24),
            url: file,
            title: title,
            metadatas: { common, format }
        }))
        fs.promises.appendFile(`./music.json`, JSON.stringify({
            _id: randomNbLtID(24),
            url: file,
            title: title,
            metadatas: { common, format }
        }), (err) => {
            if (err) throw err;
        });
        return arr
    })
    Promise.all(response).then(res => {
        // return fs.writeFile(`./data.json`, JSON.stringify(res))
        return res
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