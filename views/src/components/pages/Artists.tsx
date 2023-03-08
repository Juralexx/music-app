import React from 'react'
import styled from 'styled-components'
import { LoadingContext, MusicsContext } from '../../AppContext'
import { IArtist } from '../../types/types'
import AlphaScrollbar from '../AlphaScrollbar'
import Artist from '../Artist'
import ArtistSongs from '../ArtistSongs'
import { groupeArtistsByAlphabeticalOrder } from '../functions/functions'

const Artists: React.FC = () => {
    const { musics } = React.useContext(MusicsContext)
    const { isLoading } = React.useContext(LoadingContext)
    const artists = groupeArtistsByAlphabeticalOrder(musics.artists)

    const artistsListRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const alphabeticalRef = React.useRef([]) as React.MutableRefObject<(HTMLDivElement[])>

    const [artist, setArtist] = React.useState<IArtist.Props>({ active: false, ...musics.artists[0] })

    return (
        <ListContainer>
            <h2>Artists <span>{Object.keys(musics.artists).length}</span></h2>
            <div className='__list'>
                <div className='list__container' ref={artistsListRef}>
                    {!isLoading ? (
                        Object.values(artists).map((arr, i) => {
                            return (
                                arr.length > 0 && (
                                    <div className='list__container-inner' key={i} ref={ref => alphabeticalRef.current[i] = ref as HTMLDivElement}>
                                        <div className='list__container-letter'>
                                            {Object.keys(musics.sorted)[i]}
                                        </div>
                                        {arr.map((artist: IArtist.Props, j: number) => {
                                            return (
                                                <Artist
                                                    key={j}
                                                    artist={artist}
                                                    onClick={() => setArtist({ ...artist, active: true })}
                                                />
                                            )
                                        })}
                                    </div>
                                )
                            )
                        })
                    ) : (
                        <div className='list__container-inner'>
                            {[...new Array(15)].map((_, i) => {
                                return (
                                    <div className='list__item' key={i} tabIndex={i}>
                                        <div className='list__item-left'>
                                            <div className='loading-skeleton loading-h12-w180 mb-2'></div>
                                            <div className='loading-skeleton loading-h12-w100'></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                <AlphaScrollbar
                    mainDivRef={artistsListRef}
                    childrenDivsRef={alphabeticalRef}
                />
            </div>
            {artist?.songs && artist?.songs.length > 0 &&
                <ArtistSongs
                    artist={artist}
                    setArtist={setArtist}
                />
            }
        </ListContainer>
    )
}

export default Artists

const ListContainer = styled.div`
    position : relative;
    width    : 100%;
    height   : 100%;
    padding  : 20px 10px 0;
    margin   : auto;
    overflow : hidden;

    h2 {
        padding : 0 20px 5px;
        span {
            font-size   : 16px;
            margin-left : 10px;
            color       : var(--text-secondary);
        }
    }

    @media (max-width: 992px) {
        padding : 15px 5px 0 0;
        h2 {
            padding       : 0 15px 5px;
            font-size     : 20px;
            margin-bottom : 10px;
            span {
                font-size : 14px;
            }
        }
    }

    .__list {
        display        : flex;
        height         : 100%;
        padding-bottom : 50px;

        @media (max-width: 992px) {
            padding-bottom : 35px;
        }
    }

    .list__container {
        position   : relative;
        height     : 100%;
        width      : 100%;
        padding    : 0 10px;
        overflow-y : auto;

        @media (max-width: 992px) {
            padding : 0 15px;
        }

        &::-webkit-scrollbar {
            width : 0;
        }
    }

    .list__container-inner {
        display               : grid;
        grid-template-columns : 1fr;
        padding-bottom        : 20px;
    }

    .list__container-letter {
        font-size     : 26px;
        padding       : 10px;

        @media (max-width: 992px) {
            font-size : 20px;
            padding   : 0;
        }
    }
`