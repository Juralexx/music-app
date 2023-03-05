import fs from 'fs'
import path from 'path'

/**
 * Create a random ID
 * @param {*} max ID length
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

/**
 * Cehck if file is a valid audio file
 * @param {*} file File to check
 */

export const isAudioFile = (file) => {
    const types = ['.wav', '.ogg', '.mp3', '.flac', '.aiff', '.wma', '.m4a']
    return types.some(el => file.endsWith(el))
}

export const isImage = (file) => {
    const types = ['image/jpg', 'image/jpeg', 'image/bmp', 'image/gif', 'image/png', 'image/svg+xml'];
    return types.some(el => file.type === el);
}

let files = [];
export const ThroughDirectory = (directory) => {
    fs.readdirSync(directory).forEach(File => {
        const absolute = path.join(directory, File);
        if (fs.statSync(absolute).isDirectory())
            return ThroughDirectory(absolute);
        else return files.push(absolute);
    });
    return files
}

/**
 * Replace all special chars except hyphens and dots
 * @param {*} string String to sanitize
 */

export const sanitize = (string) => {
    const sanitized = string.replace(/[&#,+()$~%^.'":*?!;<>{}/\\\\]/g, " ")
    return sanitized
}