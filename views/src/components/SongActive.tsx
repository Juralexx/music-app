import React from 'react'
import styled from 'styled-components'
import { MusicsContext, PlayerContext, TrackContext } from '../AppContext'
import { onMusicClick } from './functions/functions'
import usePlayer from './functions/usePlayer'
import PlayerIcon from './PlayerIcon'
import { AudioLoader, AudioLoaderActive } from './tools/loader/AudioLoader'
import { timeFormat } from './tools/Utils'

const SongActive: React.FC = () => {
    const { musics } = React.useContext(MusicsContext)
    const { track, setTrack } = React.useContext(TrackContext)
    const { player } = React.useContext(PlayerContext)

    const { timeRange } = usePlayer(player)

    return (
        <SongItem className={`list__item active`}
            onClick={() => {
                onMusicClick(track, setTrack, track.song, player, musics.all)
                localStorage.setItem('musicContext', JSON.stringify({ name: 'all' }))
            }}
        >
            <div className='list__item-left'>
                <PlayerIcon
                    isPlaying={track.isPlaying}
                    currentTime={timeRange.currentTime}
                    duration={timeRange.duration}
                />
                <div className='list__item-infos'>
                    <div className='list__item-title'>
                        {track.song.title}
                    </div>
                    <div className='list__item-artist'>
                        <span>{track.song.metadatas.common.artist ? track.song.metadatas.common.artist : 'Artiste inconnu'}</span>
                        <span>{track.song.metadatas.common.artist && track.song.metadatas.common.album && '|'}</span>
                        <span>{track.song.metadatas?.common?.album}</span>
                    </div>
                </div>
            </div>
            <div className='list__item-time'>
                {track.isPlaying ? (
                    <AudioLoaderActive className='list__item-animation' />
                ) : (
                    <AudioLoader className='list__item-animation' />
                )}
                {timeFormat(track.song.metadatas.format.duration)}
            </div>
        </SongItem>
    )
}

export default SongActive

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
        .list__item-note {
            color : var(--primary)
        }
    }

    &.active {
        .list__item-title {
            color : var(--primary)
        }
        .list__item-icon {
            border-radius    : var(--rounded-full);
        }
        .list__item-animation {
            display : block;
        }
    }

    .list__item-left {
        display     : flex;
        align-items : center;
        width       : 70%;
    }

    .list__item-icon {
        position         : relative;
        border-radius    : var(--rounded-md);
        min-height       : 50px;
        min-width        : 50px;
        color            : var(--svg);
        background-color : var(--x-light);
        .list__item-play,
        .list__item-note {
            position  : absolute;
            top       : 50%;
            left      : 50%;
            transform : translate(-50%, -50%);
            height    : 24px;
            width     : 24px;
            z-index   : 1;
        }
        .list__item-play {
            left  : 54%;
            color : var(--primary);
        }
        .track {
            position  : relative;
            fill      : var(--x-light);
            transform : rotate(-90deg);
            z-index   : 0;
            circle {
                stroke            : var(--primary);
                stroke-width      : 4;
                stroke-dasharray  : 141.37;
                /* stroke-dashoffset : 141.37; */
            }
        }
    }

    .list__item-infos {
        padding-left : 15px;

        .list__item-title,
        .list__item-artist {
            width              : 100%;
            text-overflow      : ellipsis;
            overflow           : hidden;
            display            : -webkit-box;
            -webkit-line-clamp : 1;
            -webkit-box-orient : vertical;
        }

        .list__item-title {
            font-weight        : 500;
            line-height        : 24px;
            max-height         : 25px;
        }

        .list__item-artist {
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

    .list__item-time {
        width           : 30%;
        padding-right   : 10px;
        display         : flex;
        align-items     : center;
        justify-content : flex-end;
        color           : var(--text);
        font-size       : 11px;
        line-height     : 13px;
    }

    .list__item-animation {
        display : none;
        height  : 25px;
        color   : var(--primary);
    }
`