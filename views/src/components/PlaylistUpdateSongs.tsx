import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { MusicsContext } from '../AppContext'
import AlphaScrollbar from './AlphaScrollbar'
import Checkbox from './tools/Checkbox'
import Icon from './tools/icons/Icon'
import { isChecked, removeSong } from './functions/functions'
import SongInactive from './SongInactive'
import { IPlaylist, Song } from '../types/types'

interface Props {
    playlist: IPlaylist.Props,
    setPlaylist: React.Dispatch<React.SetStateAction<IPlaylist.Props>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaylistUpdateSongs = ({ open, setOpen, playlist, setPlaylist }: Props) => {
    const { musics, playlists, setPlaylists } = React.useContext(MusicsContext)
    const [songs, setSongs] = React.useState<Array<Song.Props>>(playlist.songs || [])

    const songListRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const alphabeticalRef = React.useRef([]) as React.MutableRefObject<(HTMLDivElement[])>

    const updateSongs = async () => {
        let updatedPlaylist = { ...playlist, songs: songs }
        delete updatedPlaylist['active']
        try {
            await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/api/update-playlist`,
                headers: { 'Authorization': process.env.REACT_APP_ACCESS_TOKEN },
                data: { playlist: updatedPlaylist }
            })
        } catch (err) {
            return console.log(err)
        }
        let updatedPlaylistsArr = [...playlists]
        const index = playlists.findIndex(el => el._id === playlist._id)
        updatedPlaylistsArr[index] = { ...playlist, songs: songs }
        setPlaylists(updatedPlaylistsArr)
        setPlaylist({ ...playlist, songs: songs })
        setOpen(false)
    }

    return (
        <ListContainer className={open ? 'vanish-right' : 'vanish-left'}>
            <div className='__container'>
                <div className='list__title'>
                    <div>
                        <Icon name="DoubleArrowLeft" className="__back" onClick={() => setOpen(false)} />
                        <h2>{playlist.name}</h2>
                    </div>
                    <button className='__save-btn' onClick={() => updateSongs()}>
                        Save
                    </button>
                </div>
                <div className='__list'>
                    <div className='list__container' ref={songListRef}>
                        {open &&
                            Object.values(musics.sorted).map((arr, i: number) => {
                                return (
                                    arr.length > 0 && (
                                        <div className="list__container-inner" key={i} ref={ref => alphabeticalRef.current[i] = ref as HTMLDivElement}>
                                            <div className='list__container-letter'>
                                                {Object.keys(musics.sorted)[i]}
                                            </div>
                                            {arr.map((music: { [key: string]: any }, j: number) => {
                                                const checked = isChecked(songs, music._id) || false
                                                return (
                                                    <div className='__song-choice' key={j} onClick={() => setSongs(!checked ? [...songs, music] : removeSong(songs, music._id))}>
                                                        <SongInactive music={music} />
                                                        <Checkbox
                                                            uniqueKey={j}
                                                            className='__checkbox'
                                                            checked={checked}
                                                            onChange={() => { }}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                )
                            })}
                    </div>
                    <AlphaScrollbar
                        mainDivRef={songListRef}
                        childrenDivsRef={alphabeticalRef}
                    />
                </div>
            </div>
        </ListContainer>
    )
}

export default PlaylistUpdateSongs

const ListContainer = styled.div`
    position   : absolute;
    top        : 0;
    left       : 0;
    width      : 100%;
    height     : 100%;
    background : var(--content);
    transition : .3s ease;
    z-index    : 2;

    .__list {
        padding-bottom : 60px !important;
        margin-top     : 10px;

        @media(max-width: 576px) {
            padding-bottom : 115px !important;
        }
    }
`