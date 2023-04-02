import React from 'react'
import styled from 'styled-components'
import { MusicsContext, PlayerContext, TrackContext } from '../AppContext'
import { onMusicClick } from './functions/functions'
import usePlayer from './functions/usePlayer'
import PlayerIcon from './PlayerIcon'
import { AudioLoader, AudioLoaderActive } from './tools/loader/AudioLoader'
import { timeFormat } from './tools/Utils'

interface Props {
    context: Record<string, any>,
    contextSongs: Array<any>
}

const SongActive = ({ context, contextSongs }: Props) => {
    const { musics } = React.useContext(MusicsContext)
    const { track, setTrack } = React.useContext(TrackContext)
    const { player } = React.useContext(PlayerContext)

    const { timeRange } = usePlayer(player)

    const { album, artist } = track.song.metadatas.common

    return (
        <SongItem className={`music__item active`}
            onClick={() => {
                onMusicClick(track, setTrack, track.song, player, { ...context, songs: contextSongs })
                localStorage.setItem('musicContext', JSON.stringify(context))
            }}
        >
            <div className='music__item-left'>
                <PlayerIcon
                    isPlaying={track.isPlaying}
                    currentTime={timeRange.currentTime}
                    duration={timeRange.duration}
                />
                <div className='music__item-infos'>
                    <div className='music__item-title'>
                        {track.song.title}
                    </div>
                    <div className='music__item-artist'>
                        <span>{artist ? artist : 'Unknown artist'}</span>
                        <span>{artist && album && '|'}</span>
                        <span>{album}</span>
                    </div>
                </div>
            </div>
            <div className='music__item-time'>
                {track.isPlaying ? (
                    <AudioLoaderActive className='music__item-animation' />
                ) : (
                    <AudioLoader className='music__item-animation' />
                )}
                {timeFormat(track.song.metadatas.format.duration)}
            </div>
        </SongItem>
    )
}

export default React.memo(SongActive)

const SongItem = styled.div`
    position        : relative;
    display         : flex;
    align-items     : center;
    justify-content : space-between;
    padding         : 10px 0;
    border-radius   : var(--rounded-md);
    cursor          : pointer;

    &:after {
        content       : '';
        position      : absolute;
        left          : 0;
        right         : 0;
        bottom        : 0;
        border-bottom : 1px solid var(--light-border);
        opacity       : 0.5;
    }

    &:hover {
        color : var(--primary);
        .music__item-note {
            color : var(--primary)
        }
    }

    &.active {
        .music__item-title {
            color : var(--primary)
        }
        .music__item-icon {
            border-radius    : var(--rounded-full);
        }
        .music__item-animation {
            display : block;
        }
    }

    .music__item-left {
        display     : flex;
        align-items : center;
        width       : 70%;
    }

    .music__item-icon {
        position         : relative;
        border-radius    : var(--rounded-md);
        min-height       : 50px;
        min-width        : 50px;
        color            : var(--svg);
        background-color : var(--x-light);
        .music__item-play,
        .music__item-note {
            position  : absolute;
            top       : 50%;
            left      : 50%;
            transform : translate(-50%, -50%);
            height    : 24px;
            width     : 24px;
        }
        .music__item-play {
            left  : 54%;
            color : var(--primary);
        }
        .track {
            position  : relative;
            fill      : var(--x-light);
            transform : rotate(-90deg);
            circle {
                stroke            : var(--primary);
                stroke-width      : 4;
                stroke-dasharray  : 141.37;
                /* stroke-dashoffset : 141.37; */
            }
        }
    }

    .music__item-infos {
        padding-left : 15px;

        .music__item-title,
        .music__item-artist {
            width              : 100%;
            text-overflow      : ellipsis;
            overflow           : hidden;
            display            : -webkit-box;
            -webkit-line-clamp : 1;
            -webkit-box-orient : vertical;
        }

        .music__item-title {
            font-weight        : 500;
            line-height        : 24px;
            max-height         : 25px;
        }

        .music__item-artist {
            font-size          : 12px;
            line-height        : 19px;
            color              : var(--text-secondary);
            max-height         : 22px;

            span {
                &:nth-child(2) {
                    margin : 0 5px;
                }
            }
        }
    }

    .music__item-time {
        width           : 30%;
        padding-right   : 10px;
        display         : flex;
        align-items     : center;
        justify-content : flex-end;
        color           : var(--text);
        font-size       : 11px;
        line-height     : 13px;
    }

    .music__item-animation {
        display : none;
        height  : 25px;
        color   : var(--primary);
    }
`