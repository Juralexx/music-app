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
    const index = songs.findIndex(el => el._id === track.song._id)
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