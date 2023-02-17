/**
 * 
 * @param {*} array 
 */

export const groupeByArtists = (array) => {
    return array.reduce((acc, d) => {
        if (Object.keys(acc).includes(d.metadatas.common.artist)) return acc;

        acc[d.metadatas.common.artist] = array.filter(g => g.metadatas.common.artist === d.metadatas.common.artist);
        return acc;
    }, {})
}

/**
 * 
 * @param {*} array 
 */

export const groupeByAlbums = (array) => {
    return array.reduce((acc, d) => {
        if (Object.keys(acc).includes(d.metadatas.common.album)) return acc;

        acc[d.metadatas.common.album] = {
            title: d.metadatas.common.album,
            artist: d.metadatas.common.artist,
            year: d.metadatas.common.year,
            songs: array.filter(g => g.metadatas.common.artist === d.metadatas.common.artist && g.metadatas.common.album === d.metadatas.common.album)
        };
        return acc;
    }, {})
}

/**
 * 
 * @param {*} array 
 * @param {*} parameter 
 */

export const groupeByAlphabeticalOrder = (array, parameter) => {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let sortedArr = {}

    // Store all parameters beginning with the same letter in the same array
    alphabet.map((letter, i) => {
        return array.reduce((a, s) => sortedArr[letter] = s[parameter].toLowerCase().startsWith(letter.toLowerCase()) ? [...a, s] : a, []);
    })

    // Store all parameters beginning with a number in the same array
    sortedArr['#'] = array.reduce((a, s) => /^\d/.test(s[parameter]) ? [...a, s] : a, []);

    // Store all parameters beginning with a special chars in the same array
    sortedArr['/'] = array.reduce((a, s) => !/^[A-Za-z0-9]/.test(s[parameter]) ? [...a, s] : a, []);

    return sortedArr
}

/**
 * 
 * @param {*} array 
 */

export const groupeArtistsByAlphabeticalOrder = (artists) => {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    let sortedArr = {}
    const artistsKeys = Object.keys(artists)

    alphabet.map((letter, i) => {
        return artistsKeys.reduce((a, s) => sortedArr[letter] = s.toLowerCase().startsWith(letter.toLowerCase()) ? [...a, { name: s, songs: artists[s] }] : a, []);
    })

    sortedArr['#'] = artistsKeys.reduce((a, s) => /^\d/.test(s) ? [...a, artists[s]] : a, []);

    sortedArr['/'] = artistsKeys.reduce((a, s) => !/^[A-Za-z0-9]/.test(s) ? [...a, artists[s]] : a, []);

    return sortedArr
}