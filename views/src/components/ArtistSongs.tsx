import React from 'react'
import styled from 'styled-components'
import Icon from './tools/icons/Icon'
import { ArtistInterface } from './pages/Artists'
import SongArtist from './SongArtist'
import { CurrentSong } from '../types/types'

interface Props {
    artist: ArtistInterface
    setArtist: React.Dispatch<React.SetStateAction<any>>
}

const ArtistSongs: React.FC<Props> = ({ artist, setArtist }) => {
    return (
        <ListContainer className={artist.active ? 'vanish-right' : 'vanish-left'}>
            <div className='album-list__title' onClick={() => setArtist({ active: false, artist: { name: '', songs: [] } })}>
                <Icon name="CaretLeft" />
                <h2>{artist.artist.name || 'Artistes inconnus'}</h2>
            </div>
            <div className='album-list__container'>
                {artist.artist.songs.map((music: CurrentSong.Props['song'], i: number) => {
                    return (
                        <SongArtist
                            key={i}
                            artist={artist}
                            music={music}
                            uniqueKey={i}
                        />
                    )
                })}
            </div>
        </ListContainer>
    )
}

export default ArtistSongs

const ListContainer = styled.div`
    position   : absolute;
    top        : 0;
    left       : 0;
    width      : 100%;
    height     : 100%;
    background : var(--content);
    transition : .3s ease;

    .album-list__title {
        display     : flex;
        align-items : center;
        padding     : 20px 25px 10px;
        
        svg {
            width         : 36px;
            height        : 36px;
            padding       : 5px;
            border-radius : var(--rounded-full);
            cursor        : pointer;
            &:hover {
                background : var(--content-light);
            }
        }

        h2 {
            padding-left   : 10px;
            padding-right  : 10px;
            padding-bottom : 0;
            margin         : 0;
            font-size      : 22px;
        }
    
        @media (max-width: 992px) {
            padding : 15px 5px;
            h2 {
                font-size          : 16px;
                margin-bottom      : 0;
                text-overflow      : ellipsis;
                overflow           : hidden;
                width              : 100%;
                display            : -webkit-box;
                -webkit-line-clamp : 1;
                -webkit-box-orient : vertical;
                span {
                    font-size : 14px;
                }
            }
        }
    }

    .album-list__container {
        position   : relative;
        height     : calc(100% - 50px);
        width      : 100%;
        padding    : 0 25px 50px;
        overflow-y : auto;

        @media (max-width: 992px) {
            padding : 0 15px 50px;
        }
    }
`