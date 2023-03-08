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
        const applyStorages = () => {
            const musicStorage = JSON.parse(localStorage.getItem('music'))
            if (Object.keys(musicStorage).length > 0) {
                setTimeRange({
                    currentTime: musicStorage?.currentTime,
                    remainingTime: musicStorage?.remainingTime,
                    duration: player.duration
                })
                player.currentTime = musicStorage?.currentTime
            }
            const volumeStorage = localStorage.getItem('volume')
            if (volumeStorage) {
                setVolume({ muted: volumeStorage > 0 ? false : true, rate: volumeStorage })
                player.volume = volumeStorage
            }
        }
        window.addEventListener('load', applyStorages);
        return () => window.removeEventListener('load', applyStorages);
    }, [player])

    React.useEffect(() => {
        const storeMusicPropsBeforeOnload = () => {
            const musicStorage = JSON.parse(localStorage.getItem('music'))
            localStorage.setItem('music', JSON.stringify({
                ...musicStorage,
                currentTime: player.currentTime,
                remainingTime: (player.duration - player.currentTime)
            }))
        }
        window.addEventListener('beforeunload', storeMusicPropsBeforeOnload);
        return () => window.removeEventListener('beforeunload', storeMusicPropsBeforeOnload);
    }, [player])

    React.useEffect(() => {
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
            localStorage.setItem('volume', player.volume)
        })
    }, [player])

    return { timeRange, volume }
}

export default usePlayer