import React from 'react'

const usePlayer = (player) => {
    const [volume, setVolume] = React.useState({
        rate: player?.volume || 1,
        muted: false
    })
    const [timeRange, setTimeRange] = React.useState({
        currentTime: player?.currentTime || 0,
        remainingTime: player?.remainingTime || 0,
        duration: player?.duration || 0
    })

    React.useEffect(() => {
        window.addEventListener('load', () => {
            const musicStorage = JSON.parse(localStorage.getItem('music'))
            if (Object.keys(musicStorage).length > 0) {
                setTimeRange({
                    currentTime: musicStorage?.currentTime,
                    remainingTime: musicStorage?.remainingTime,
                    duration: player.duration
                })
                player.currentTime = musicStorage?.currentTime
            }
        })
        window.addEventListener('beforeunload', () => {
            const musicStorage = JSON.parse(localStorage.getItem('music'))
            localStorage.setItem('music', JSON.stringify({
                ...musicStorage,
                currentTime: player.currentTime,
                remainingTime: (player.duration - player.currentTime)
            }))
        })
        player?.addEventListener('pause', () => {
            const musicStorage = JSON.parse(localStorage.getItem('music'))
            localStorage.setItem('music', JSON.stringify({
                ...musicStorage,
                currentTime: player.currentTime,
                remainingTime: (player.duration - player.currentTime)
            }))
        })
        player?.addEventListener('loadeddata', () => {
            const musicStorage = JSON.parse(localStorage.getItem('music'))
            setTimeRange({
                currentTime: musicStorage?.currentTime || player.currentTime,
                remainingTime: musicStorage?.remainingTime || player.duration,
                duration: player.duration
            })
        })
        player?.addEventListener('timeupdate', () => {
            setTimeRange(prev => ({
                ...prev,
                currentTime: player.currentTime,
                remainingTime: player.duration - player.currentTime
            }))
        })
        player?.addEventListener('volumechange', () => {
            if (player.volume === 0) {
                setVolume({ muted: true, rate: player.volume })
            } else setVolume({ muted: false, rate: player.volume })
        })
    }, [player])

    return { timeRange, volume }
}

export default usePlayer