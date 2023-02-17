import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { parseFile, selectCover } from 'music-metadata';
dotenv.config({ path: './config.env' })
import fs from 'graceful-fs'
import path from 'path'

const app = express();

app.use(cors({
    mode: 'no-cors',
    credentials: true,
    origin: '*',
    "Access-Control-Allow-Origin": '*',
    'allowedHeaders': ['application/javascript'],
    'methods': 'GET, OPTIONS, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false,
}))

app.use('/musics', express.static('D:/Music-App/'))
app.use('/datas', express.static('./data.json'))

/**
 * 
 */

export const randomNbLtID = (max) => {
    const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
    const allNumbers = [..."0123456789"];

    const baseline = [...allNumbers, ...allLowerAlpha];

    const generator = (base, len) => {
        return [...Array(len)]
            .map(i => base[Math.random() * base.length | 0])
            .join('');
    }

    return generator(baseline, max)
}

export const isAudioFile = (file) => {
    const types = ['.wav', '.ogg', '.mp3', '.flac', '.aiff', '.wma', '.m4a']
    return types.some(el => file.endsWith(el))
}

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
    const dirname = 'D:/Music-App/'
    let array = ThroughDirectory(dirname)
    let arr = []
    const response = array.map(async (file, i) => {
        const { common, format } = await parseFile(file);
        if (common?.picture) {
            delete common.picture
        }
        let title = file.substring(file.lastIndexOf("\\") + 1, file.lastIndexOf("."))

        arr.push(JSON.stringify({
            _id: randomNbLtID(24),
            url: file,
            title: title,
            metadatas: { common, format }
        }))
        fs.promises.appendFile(`./data.json`, JSON.stringify({
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

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`)
})