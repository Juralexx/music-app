import React from 'react'
import axios from 'axios'
import { IPlaylist } from '../../types/types'

const usePlaylists = () => {
    const [playlists, setPlaylists] = React.useState<Array<IPlaylist.Props>>([])

    React.useEffect(() => {
        if (playlists.length === 0) {
            const fetchPlaylists = async () => {
                await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/api/fetch-playlists`,
                    headers: {
                        'Authorization': process.env.REACT_APP_ACCESS_TOKEN
                    }
                })
                    .then(async res => {
                        if (res.data.length > 0) {
                            const promise: any[] = res.data.map(async (file: string) => {
                                return await axios({
                                    method: 'GET',
                                    url: `${process.env.REACT_APP_API_URL}/api/playlists/${file}`,
                                    headers: {
                                        'Authorization': process.env.REACT_APP_ACCESS_TOKEN
                                    }
                                })
                                    .then(response => response.data)
                                    .catch(err => console.log(err))
                            })
                            Promise.all(promise).then(response => {
                                setPlaylists(response)
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }
            fetchPlaylists()
        }
    }, [playlists])

  return { playlists, setPlaylists }
}

export default usePlaylists