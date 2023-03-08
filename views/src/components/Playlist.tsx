import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { MusicsContext, TrackContext } from '../AppContext'
import { CurrentSong, IPlaylist } from '../types/types'
import PlaylistUpdateName from './PlaylistUpdateName'
import PlaylistUpdateSongs from './PlaylistUpdateSongs'
import Song from './Song'
import SongActive from './SongActive'
import Icon from './tools/icons/Icon'
import ToolsMenu from './tools/ToolsMenu'

interface Props {
    playlist: IPlaylist.Props,
    setPlaylist: React.Dispatch<React.SetStateAction<IPlaylist.Props>>
}

const Playlist = ({ playlist, setPlaylist }: Props) => {
    const { playlists, setPlaylists } = React.useContext(MusicsContext)
    const { track } = React.useContext(TrackContext)
    const [updatedPlaylistName, setUpdatedPlaylistName] = React.useState<boolean>(false)
    const [updatedPlaylistSongs, setUpdatedPlaylistSongs] = React.useState<boolean>(false)

    const deletePlaylist = async () => {
        let updatedPlaylistsArr = [...playlists]
        const index = playlists.findIndex(el => el._id === playlist._id)
        updatedPlaylistsArr.splice(index, 1)
        setPlaylists(updatedPlaylistsArr)
        setPlaylist({ ...playlists[index - 1], active: false })
        try {
            await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/api/delete-playlist`,
                headers: { 'Authorization': process.env.REACT_APP_ACCESS_TOKEN },
                data: { playlist: playlist }
            })
        } catch (err) {
            return console.log(err)
        }
    }

    return (
        <ListContainer className={playlist.active ? 'vanish-right' : 'vanish-left'}>
            <div className='__container __root'>
                <div className='list__title'>
                    <div>
                        <Icon name="DoubleArrowLeft" className="__back" onClick={() => setPlaylist((prev: any) => ({ ...prev, active: false }))} />
                        <h2>{playlist.name || 'Unknown artists'}</h2>
                    </div>
                    <ToolsMenu mobile>
                        <div onClick={() => setUpdatedPlaylistName(true)}>
                            Update playlist informations
                        </div>
                        <div onClick={() => setUpdatedPlaylistSongs(true)}>
                            Add songs
                        </div>
                        {!playlist?.undeletable ? (
                            <div onClick={() => deletePlaylist()}>
                                Delete playlist
                            </div>
                        ) : (
                            <div>
                                This playlist can't be deleted
                            </div>
                        )}
                    </ToolsMenu>
                </div>
                <div className='list__container'>
                    {playlist.active &&
                        playlist.songs.length > 0 &&
                        playlist.songs.map((music: CurrentSong.Props['song'], i: number) => {
                            return (
                                track.song._id !== music._id ? (
                                    <Song
                                        key={i}
                                        music={music}
                                        context={{ name: 'playlist', _id: playlist._id, playlist: playlist.name }}
                                        contextSongs={playlist.songs}
                                    />
                                ) : (
                                    <SongActive key={i} />
                                )
                            )
                        })}
                </div>
            </div>
            <PlaylistUpdateName
                open={updatedPlaylistName}
                setOpen={setUpdatedPlaylistName}
                playlist={playlist}
                setPlaylist={setPlaylist}
            />
            {playlist.songs &&
                <PlaylistUpdateSongs
                    open={updatedPlaylistSongs}
                    setOpen={setUpdatedPlaylistSongs}
                    playlist={playlist}
                    setPlaylist={setPlaylist}
                />
            }
        </ListContainer>
    )
}

export default Playlist

const ListContainer = styled.div`
    position   : absolute;
    top        : 0;
    left       : 0;
    width      : 100%;
    height     : 100%;
    background : var(--content);
    transition : .3s ease;

    .__root {
        .list__container {
            padding-right : 0 !important;
            height        : calc(100% - 50px);

            &::-webkit-scrollbar {
                width : 8px;
            }

            @media(max-width: 992px) {
                height : calc(100% - 60px);

                &::-webkit-scrollbar {
                    width : 0;
                }
            }
        }

        .list__title {
            @media(max-width: 576px) {
                flex-direction : row;
                align-items    : center;
            }
        }
    }
`