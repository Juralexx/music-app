import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { MusicsContext } from '../AppContext'
import { IPlaylist } from '../types/types'
import { IconInput } from './tools/Inputs'
import Modal from './tools/Modal'

interface Props {
    playlist: IPlaylist.Props,
    setPlaylist: React.Dispatch<React.SetStateAction<IPlaylist.Props>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaylistUpdateName = ({ open, setOpen, playlist, setPlaylist }: Props) => {
    const { playlists, setPlaylists } = React.useContext(MusicsContext)
    const [name, setName] = React.useState<string>(playlist.name || '')

    const updateName = async () => {
        if (name === '') return
        else {
            let updatedPlaylist = { ...playlist, name: name }
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
            updatedPlaylistsArr[index] = { ...playlist, name: name }
            setPlaylists(updatedPlaylistsArr)
            setPlaylist({ ...playlist, name: name })
            setOpen(false)
        }
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <h3>Modifier la playlist : {playlist.name}</h3>
            <InputContainer>
                <IconInput
                    type="text"
                    placeholder={playlist.name}
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    cross
                    onClean={() => setName(playlist.name)}
                />
                <button onClick={() => updateName()}>
                    Save
                </button>
            </InputContainer>
        </Modal>
    )
}

export default PlaylistUpdateName

const InputContainer = styled.div`
    margin-top : 20px;

    > div {
        width : 100%;
    }

    button {
        font-size        : 16px;
        padding          : 10px 30px 8px;
        color            : var(--primary);
        background-color : rgba(var(--primary-rgb), 0.08);
        border-radius    : var(--rounded-sm);
        width            : 100%;
        margin-top       : 15px;

        &:hover {
            background-color : rgba(var(--primary-rgb), 0.17);
        }
    }
`