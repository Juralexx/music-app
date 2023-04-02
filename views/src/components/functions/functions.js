/**
 * 
 * @param {*} current 
 * @param {*} music 
 */

export const onMusicClick = (track, setTrack, music, player, context) => {
    if (!track.isPlaying) {
        if (track.song._id !== music._id) {
            localStorage.setItem('music', JSON.stringify({
                ...music,
                currentTime: 0,
                remainingTime: music.metadatas.format.duration
            }))
            setTrack({ isPlaying: true, song: music, context: context })
        } else {
            if (player.paused) {
                setTrack(prev => ({ ...prev, isPlaying: true }))
                player.play()
            }
        }
    } else {
        if (track.song._id !== music._id) {
            localStorage.setItem('music', JSON.stringify({
                ...music,
                currentTime: 0,
                remainingTime: music.metadatas.format.duration
            }))
            setTrack({ isPlaying: true, song: music, context: context })
        } else {
            if (!player.paused) {
                setTrack(prev => ({ ...prev, isPlaying: false }))
                player.pause()
            }
        }
    }
}

/**
 * 
 * @param {*} current 
 */

export const onPlayerClick = (track, setTrack, player) => {
    if (!track.isPlaying) {
        if (Object.keys(track.song).length > 0) {
            setTrack(prev => ({ ...prev, isPlaying: true }))
            player.play()
        }
    } else {
        setTrack(prev => ({ ...prev, isPlaying: false }))
        player.pause()
    }
}

/**
 * 
 */

export const changeSong = (direction, track) => {
    const songs = track.context.songs
    if (songs?.length > 0) {
        const index = songs.findIndex(el => el._id === track.song._id)
        if (index !== null && index !== undefined) {
            if (direction === 'forward') {
                if (index < songs.length - 1) {
                    return songs[index + 1]
                } else {
                    return songs[0]
                }
            } else {
                if (index > 0) {
                    return songs[index - 1]
                } else {
                    return songs[songs.length - 1]
                }
            }
        }
    }
}

/**
 * 
 */

export const isChecked = (array, id) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i]._id === id)
            return true
    }
}

export const removeSong = (array, id) => {
    const index = array.findIndex(e => e._id === id)
    let arr = [...array]
    arr.splice(index, 1)
    return arr
}

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