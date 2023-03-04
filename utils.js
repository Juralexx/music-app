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