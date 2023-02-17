import React from 'react';
import axios from 'axios';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { MusicsContext, PlayerContext, TrackContext, LoadingContext, PlayerPropsContext } from './AppContext'
import { convertObjToArr, sortByAlphabetical, randomItem } from './components/tools/Utils';
import { groupeByAlbums, groupeByAlphabeticalOrder, groupeByArtists } from './components/tools/functions';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import Songs from './components/pages/Songs';
import Albums from './components/pages/Albums';
import Artists from './components/pages/Artists';
import PlayerBar from './components/PlayerBar';
import Player from './components/Player';
import Home from './components/pages/Home';
import { IconInput } from './components/tools/Inputs';
import Icon from './components/tools/icons/Icon';
// import { AnimatedLogo } from './components/tools/Logo';

export interface Musics {
    all: object[],
    sorted: {
        [key: string]: any
    },
    artists: {
        [key: string]: any
    },
    albums: {
        [key: string]: any
    }
}

const defaultMusics: Musics = {
    all: [],
    sorted: {},
    artists: {},
    albums: {}
}

export interface CurrentSong {
    isPlaying: boolean,
    song: {
        _id?: string,
        url?: string,
        title?: string,
        artist?: string,
        currentTime?: number
        remainingTime?: number,
        metadatas?: any,
    },
    context: {
        name?: string,
        songs?: any[]
    }
}

const defaultCurrentSong: CurrentSong = {
    isPlaying: false,
    song: {
        _id: String(),
        url: String(),
        title: String(),
        artist: String(),
        currentTime: Number(),
        remainingTime: Number(),
        metadatas: {}
    },
    context: {
        name: String(),
        songs: []
    }
}

export interface PlayerProps {
    open: boolean,
    mode: string
}

const defaultPlayerProps: PlayerProps = {
    open: false,
    mode: 'shuffle'
}

const App: React.FC = () => {
    const [musics, setMusics] = React.useState<Musics>(defaultMusics)
    const [track, setTrack] = React.useState<CurrentSong>(defaultCurrentSong)
    const [isLoading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        if (musics.all.length === 0) {
            const fetchMusics = async () => {
                await axios.get(`${process.env.REACT_APP_API_URL}/datas`)
                    .then(res => {
                        const all = sortByAlphabetical(res.data, 'title')
                        const sorted = groupeByAlphabeticalOrder(res.data, 'title')
                        const artists = groupeByArtists(res.data)
                        const albums = groupeByAlbums(res.data)

                        setMusics({
                            all: all,
                            sorted: sorted,
                            artists: artists,
                            albums: albums
                        })

                        const musicStorage = JSON.parse(localStorage.getItem('music') || '{}')
                        const contextStorage = JSON.parse(localStorage.getItem('musicContext') || '{}')

                        if (musicStorage?.title)
                            setTrack(prev => ({ ...prev, song: musicStorage }))
                        else setTrack(prev => ({ ...prev, song: res.data[0] }))

                        if (Object.keys(contextStorage).length > 0) {
                            if (contextStorage.name === 'all') {
                                setTrack(prev => ({
                                    ...prev,
                                    context: Object.assign(contextStorage, { songs: res.data })
                                }))
                            } else if (contextStorage.name === 'artist') {
                                setTrack(prev => ({
                                    ...prev,
                                    context: Object.assign(contextStorage, { songs: artists[contextStorage.artist].songs })
                                }))
                            } else if (contextStorage.name === 'album') {
                                const albumsArr = convertObjToArr(albums)
                                const albumArr = albumsArr.find(el => el.title === contextStorage.album && el.artist === contextStorage.artist)
                                setTrack(prev => ({
                                    ...prev,
                                    context: Object.assign(contextStorage, { songs: albumArr.songs })
                                }))
                            }
                        } else {
                            setTrack(prev => ({ ...prev, context: { name: 'all', songs: res.data } }))
                            localStorage.setItem('musicContext', JSON.stringify({ name: 'all' }))
                        }

                        const timer = setTimeout(() => setLoading(false), 1000)
                        return () => clearTimeout(timer)
                    })
                    .catch(err => console.log(err))
            }
            fetchMusics()
        }
    }, [musics])

    /**
     * 
     */

    const player = React.useRef(new Audio(`${process.env.REACT_APP_API_URL}${track.song.url}`)) as React.RefObject<HTMLMediaElement>

    const [playerProps, setPlayerProps] = React.useState<PlayerProps>(defaultPlayerProps)

    React.useEffect(() => {
        if (player.current !== null) {
            player.current.crossOrigin = "anonymous"
            player.current.src = `${process.env.REACT_APP_API_URL}${track.song.url}`
            player.current.load()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.current, track.song.url])

    /**
     * 
     */

    React.useEffect(() => {
        if (player.current !== null) {
            player.current?.addEventListener('loadeddata', () => {
                if (track.isPlaying) {
                    player.current!.play()
                } else {
                    player.current!.pause()
                }
                if (Object.keys(track.song).length > 0) {
                    localStorage.setItem('music', JSON.stringify({
                        ...track.song,
                        currentTime: 0,
                        remainingTime: track.song?.metadatas?.format?.duration
                    }))
                }
            })

            const automaticMusicChange = () => {
                if (playerProps.mode === 'repeatOne') {
                    if (track.song.url) {
                        player.current!.src = `${process.env.REACT_APP_API_URL}${track.song.url}`
                        player.current!.load()
                    }
                } else if (playerProps.mode === 'repeat') {
                    const array = track.context.songs || []
                    const index = array!.findIndex((el: any) => el._id === track.song._id)
                    if (index >= 0 && index < array.length - 1) {
                        setTrack(prev => ({ ...prev, song: array[index + 1] }))
                        localStorage.setItem('music', JSON.stringify({
                            ...array[index + 1],
                            currentTime: 0,
                            remainingTime: player.current!.duration
                        }))
                        player.current!.src = `${process.env.REACT_APP_API_URL}${array[index + 1].url}`
                        player.current!.load()
                    } else {
                        setTrack(prev => ({ ...prev, song: array[0] }))
                        localStorage.setItem('music', JSON.stringify({
                            ...array[0],
                            currentTime: 0,
                            remainingTime: player.current!.duration
                        }))
                        player.current!.src = `${process.env.REACT_APP_API_URL}${array[0].url}`
                        player.current!.load()
                    }
                } else if (playerProps.mode === 'shuffle') {
                    if (track.context.songs !== undefined) {
                        const item = randomItem(track.context.songs)
                        if (Object.keys(item).length > 0) {
                            setTrack(prev => ({ ...prev, song: item }))
                            localStorage.setItem('music', JSON.stringify({
                                ...item,
                                currentTime: 0,
                                remainingTime: player.current!.duration
                            }))
                        }
                    }
                }
            }

            player.current.addEventListener('ended', automaticMusicChange)
            return () => player.current!.removeEventListener('ended', automaticMusicChange) // eslint-disable-line react-hooks/exhaustive-deps
        }
    }, [player, playerProps.mode, track])

    /**
     * 
     */

    const [isSearching, setSearching] = React.useState<boolean>(false)

    /**
     * 
     */

    return (
        <RootContainer>
            <GlobalStyles />
            <BrowserRouter>
                <Sidebar />
                <MusicsContext.Provider value={{ musics, setMusics }} >
                    <LoadingContext.Provider value={{ isLoading, setLoading }} >
                        <TrackContext.Provider value={{ track, setTrack }} >
                            <PlayerContext.Provider value={{ player: player?.current }} >
                                <RootInner>
                                    <SearchContainer>
                                        <IconInput
                                            type="text"
                                            readOnly
                                            placeholder="Rechercher..."
                                            className="is_end_icon"
                                            endIcon={<Icon name="Search" />}
                                            onClick={() => setSearching(true)}
                                        />
                                    </SearchContainer>
                                    <Search
                                        isSearching={isSearching}
                                        setSearching={setSearching}
                                    />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/songs" element={<Songs />} />
                                        <Route path="/artists" element={<Artists />} />
                                        <Route path="/albums" element={<Albums />} />
                                        <Route path="*" element={<Navigate to="/" />} />
                                    </Routes>
                                    <PlayerPropsContext.Provider value={{ playerProps, setPlayerProps }}>
                                        <Player />
                                        <PlayerBar />
                                    </PlayerPropsContext.Provider>
                                </RootInner>
                            </PlayerContext.Provider>
                        </TrackContext.Provider>
                    </LoadingContext.Provider>
                </MusicsContext.Provider>
                {/* {isLoading &&
                    <div className="loader">
                        <AnimatedLogo />
                    </div>
                } */}
            </BrowserRouter>
        </RootContainer>
    );
}

export default App;

/**
 * 
 */

const RootContainer = styled.div`
    position   : relative;
    height     : 100vh;
    width      : 100vw;
    background : var(--content);
    display    : flex;

    @media (max-width: 992px) {
        flex-direction : column;
    }

    .loader {
        display         : flex;
        align-items     : center;
        justify-content : center;
        position        : absolute;
        width           : 100vw;
        height          : 100vh;
        background      : linear-gradient(to bottom, var(--content), var(--content-x-light));
        z-index         : 100;
        svg {
            width : 200px;
            color : var(--primary);
        }
    }
`

const RootInner = styled.div`
    position       : relative;
    display        : flex;
    flex-direction : column;
    height         : 100vh;
    width          : calc(100vw - 20%);
    margin         : 0 auto;
    background     : var(--content);

    @media (max-width: 992px) {
        height : calc(100% - 108px);
        width  : 100vw;
    }
`
const SearchContainer = styled.div`
    position : relative;
    padding  : 10px 20px;

    @media (max-width: 992px) {
        position : absolute;
        top      : -105px;
        right    : 60px;
        width    : calc(100% - 120px);
        padding  : 10px;
        
        .icon-input {
            max-width : 100%;
            width     : 100%;
        }
    }
`