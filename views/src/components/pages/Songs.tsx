import React from 'react'
import styled from 'styled-components'
import { TrackContext, LoadingContext, MusicsContext } from '../../AppContext'
import Icon from '../tools/icons/Icon'
import AlphaScrollbar from '../AlphaScrollbar'
import SongActive from '../SongActive'
import Song from '../Song'

const Songs: React.FC = () => {
    const { musics } = React.useContext(MusicsContext)
    const { isLoading } = React.useContext(LoadingContext)
    const { track } = React.useContext(TrackContext)

    const songListRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const alphabeticalRef = React.useRef([]) as React.MutableRefObject<(HTMLDivElement[])>

    return (
        <ListContainer>
            <h2>All songs <span>{musics.all.length}</span></h2>
            <div className='__list'>
                <div className='list__container' ref={songListRef}>
                    {!isLoading ? (
                        Object.values(musics.sorted).map((arr, i: number) => {
                            return (
                                arr.length > 0 && (
                                    <div className="list__container-inner" key={i} ref={ref => alphabeticalRef.current[i] = ref as HTMLDivElement}>
                                        <div className='list__container-letter'>
                                            {Object.keys(musics.sorted)[i]}
                                        </div>
                                        {arr.map((music: { [key: string]: any }, j: number) => {
                                            return (
                                                track.song._id !== music._id ? (
                                                    <Song
                                                        key={j}
                                                        music={music}
                                                        context={{ name: 'all' }}
                                                        contextSongs={musics.all}
                                                    />
                                                ) : (
                                                    <SongActive
                                                        key={j}
                                                        context={{ name: 'all' }}
                                                        contextSongs={musics.all}
                                                    />
                                                )
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
                                    <div className='list__item' key={i}>
                                        <div className='list__item-left'>
                                            <div className='list__item-icon'>
                                                <Icon name="MusicFile" className='list__item-note' />
                                            </div>
                                            <div className='list__item-infos'>
                                                <div className='loading-skeleton loading-h12-w180 mb-2'></div>
                                                <div className='loading-skeleton loading-h12-w100'></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                <AlphaScrollbar
                    mainDivRef={songListRef}
                    childrenDivsRef={alphabeticalRef}
                />
            </div>
        </ListContainer>
    )
}

export default Songs

const ListContainer = styled.div`
    position : relative;
    width    : 100%;
    height   : 100%;
    padding  : 20px 15px 0;
    margin   : auto;
    overflow : hidden;

    h2 {
        padding : 0 10px 5px;
        span {
            font-size   : 16px;
            margin-left : 10px;
            color       : var(--text-secondary);
        }
    }

    @media (max-width: 992px) {
        padding : 15px 5px 0;
        h2 {
            font-size     : 20px;
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
            padding : 0 10px;
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
        padding       : 0 10px;

        @media (max-width: 992px) {
            font-size : 20px;
            padding   : 0 5px;
        }
    }
`