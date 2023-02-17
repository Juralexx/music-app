import React from 'react'
import styled from 'styled-components'
import Icon from '../tools/icons/Icon'
import AlbumSongs from '../AlbumSongs'
import Album from '../Album'
import { LoadingContext, MusicsContext } from '../../AppContext'
import { sortByAlphabetical } from '../tools/Utils'

export interface AlbumInterface {
    active: boolean,
    album: {
        title: string,
        artist: string,
        year: string,
        songs: object[]
    }
}

const Albums: React.FC = () => {
    const { musics } = React.useContext(MusicsContext)
    const { isLoading } = React.useContext(LoadingContext)

    const sorted = sortByAlphabetical(Object.values(musics.albums).filter(e => e.title !== undefined), 'title')
    const undefineds = Object.values(musics.albums).filter(e => e.title === undefined)
    const albums = sorted.concat(undefineds)

    const [album, setAlbum] = React.useState<AlbumInterface>({ active: false, album: albums[0] })

    return (
        <ListContainer>
            <h2>Albums <span>{Object.keys(musics.albums).length}</span></h2>
            <div className='list__container'>
                {!isLoading ? (
                    albums.map((album: AlbumInterface["album"], i: number) => {
                        return (
                            <Album
                                key={i}
                                album={album}
                                onClick={() => setAlbum({ active: true, album: album })}
                            />
                        )
                    })
                ) : (
                    [...new Array(5)].map((_, i) => {
                        return (
                            <div className='list__item' key={i}>
                                <div className='list__item-left'>
                                    <Icon name="CD" className='list__item-icon' />
                                    <div className='list__item-infos'>
                                        <div className='loading-skeleton loading-h14-w200 mb-2'></div>
                                        <div className='loading-skeleton loading-h12-w100'></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
            {album?.album !== undefined &&
                <AlbumSongs
                    album={album}
                    setAlbum={setAlbum}
                />
            }
        </ListContainer>
    )
}

export default Albums

/**
 * 
 */

const ListContainer = styled.div`
    position    : relative;
    width       : 100%;
    height      : 100%;
    margin      : auto;
    overflow    : hidden;
    padding-top : 20px;

    h2 {
        padding : 0 30px 5px;
        span {
            font-size   : 16px;
            margin-left : 10px;
            color       : var(--text-secondary);
        }
    }

    @media (max-width: 992px) {
        padding : 15px 0 0;
        h2 {
            padding       : 0 15px 5px;
            font-size     : 20px;
            span {
                font-size : 14px;
            }
        }
    }

    .list__container {
        position       : relative;
        height         : calc(100% - 50px);
        width          : 100%;
        padding        : 0 25px 50px;
        overflow-y     : auto;

        @media (max-width: 992px) {
            height  : calc(100% - 35px);
            padding : 0 15px 50px;
        }
    }
`