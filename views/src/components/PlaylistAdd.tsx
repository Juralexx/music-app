import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { MusicsContext } from '../AppContext'
import AlphaScrollbar from './AlphaScrollbar'
import { isChecked, removeSong } from './functions/functions'
import SongInactive from './SongInactive'
import Checkbox from './tools/Checkbox'
import Icon from './tools/icons/Icon'
import { IconInput } from './tools/Inputs'
import { randomNbLtID } from './tools/Utils'

interface Props {
    addPlaylist: boolean
    setAddPlaylist: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaylistAdd = ({ addPlaylist, setAddPlaylist }: Props) => {
    const { musics, playlists, setPlaylists } = React.useContext(MusicsContext)
    const [playlist, setPlaylist] = React.useState<Record<any, any>>({ _id: randomNbLtID(24), name: '', songs: [] })

    const songListRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const alphabeticalRef = React.useRef([]) as React.MutableRefObject<(HTMLDivElement[])>

    const postPlaylist = async () => {
        let newPlaylist = playlist
        if (newPlaylist.name === '') {
            newPlaylist.name = `Playlist ${playlists.length + 1}`
        }
        try {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/api/add-playlist`,
                headers: { 'Authorization': process.env.REACT_APP_ACCESS_TOKEN },
                data: { playlist: newPlaylist }
            })
        } catch (err) {
            return console.log(err)
        }
        setPlaylists((prev: any) => [...prev, playlist])
        setAddPlaylist(false)
        setPlaylist({ _id: randomNbLtID(24), name: '', songs: [] })
    }

    return (
        <ListContainer className={addPlaylist ? 'vanish-right' : 'vanish-left'}>
            <div className='__container'>
                <div className='list__title'>
                    <Icon name="DoubleArrowLeft" className="__back" onClick={() => setAddPlaylist(false)} />
                    <h2>Add a playlist</h2>
                </div>
                <div className='__container-top'>
                    <IconInput
                        type="text"
                        placeholder={`Playlist ${playlists.length + 1}`}
                        value={playlist.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaylist(prev => ({ ...prev, name: e.target.value }))}
                        cross
                        onClean={() => setPlaylist(prev => ({ ...prev, name: '' }))}
                    />
                    <button className='__save-btn' onClick={() => postPlaylist()}>
                        Save
                    </button>
                </div>
                <div className='__list'>
                    <div className='list__container' ref={songListRef}>
                        {addPlaylist &&
                            Object.values(musics.sorted).map((arr, i: number) => {
                                return (
                                    arr.length > 0 && (
                                        <div className="list__container-inner" key={i} ref={ref => alphabeticalRef.current[i] = ref as HTMLDivElement}>
                                            <div className='list__container-letter'>
                                                {Object.keys(musics.sorted)[i]}
                                            </div>
                                            {arr.map((music: { [key: string]: any }, j: number) => {
                                                const checked = isChecked(playlist.songs, music._id) || false
                                                return (
                                                    <div className='__song-choice' key={j} onClick={() => setPlaylist(prev => ({ ...prev, songs: !checked ? [...playlist.songs, music] : removeSong(playlist.songs, music._id) }))}>
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

export default PlaylistAdd

const ListContainer = styled.div`
    position   : absolute;
    top        : 0;
    left       : 0;
    width      : 100%;
    height     : 100%;
    background : var(--content);
    transition : .3s ease;
    z-index    : 2;

    .list__title {
        @media(max-width: 576px) {
            flex-direction : row;
            align-items    : center;
        }
    }

    .__list {
        padding-bottom : 105px !important;
        margin-top     : 10px;

        @media(max-width: 576px) {
            padding-bottom : 160px !important;
        }
    }
`