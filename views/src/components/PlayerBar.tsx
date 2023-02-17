import React from 'react'
import styled from 'styled-components'
import { LoadingContext, TrackContext, PlayerContext, PlayerPropsContext } from '../AppContext'
import Icon from './tools/icons/Icon'
import { changeSong, onPlayerClick } from './functions/functions'
import { timeFormat } from './tools/Utils'
import usePlayer from './functions/usePlayer'

const PlayerBar: React.FC = () => {
    const { track, setTrack } = React.useContext(TrackContext)
    const { isLoading } = React.useContext(LoadingContext)
    const { player } = React.useContext(PlayerContext)
    const { playerProps, setPlayerProps } = React.useContext(PlayerPropsContext)

    const { timeRange, volume } = usePlayer(player)

    return (
        <MusicPlayer>
            <div className='player__inner'>
                <div className='player__actions'>
                    <div className="player__action-back" onClick={() => setTrack(prev => ({ ...prev, song: changeSong('backward', track) }))}>
                        <Icon name="Backward" />
                    </div>
                    <div className="player__action-play" onClick={() => onPlayerClick(track, setTrack, player)}>
                        {track.isPlaying ? (
                            <Icon name='Pause' />
                        ) : (
                            <Icon name='Play' className="player__icon-play" />
                        )}
                    </div>
                    <div className="player__action-next" onClick={() => setTrack(prev => ({ ...prev, song: changeSong('forward', track) }))}>
                        <Icon name="Forward" />
                    </div>
                </div>
                <div className='music__range'>
                    {!isLoading ? (
                        Object.keys(track.song).length > 0 &&
                        <div className='player__title' onClick={() => setPlayerProps(prev => ({ ...prev, open: true }))}>
                            <p>{track.song.title}</p>
                            <p>{track.song.artist || 'Artiste inconnu'}</p>
                        </div>
                    ) : (
                        <div className='player__title'>
                            <div className='loading-skeleton loading-h12-w180 mb-1'></div>
                            <div className='loading-skeleton loading-h12-w120'></div>
                        </div>
                    )}
                    <div className='timestamp start'>
                        {timeFormat(timeRange.currentTime)}
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={timeRange.duration || 0}
                        step="1"
                        value={timeRange.currentTime}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => player!.currentTime = Number(e.target.value)}
                        style={{ backgroundSize: `${(timeRange.currentTime / timeRange.duration * 100)}% 100%` }}
                    />
                    <div className='timestamp end'>
                        {timeFormat(timeRange.remainingTime)}
                    </div>
                </div>
                <div className='player__tools'>
                    <div className='suffle__repeat'>
                        {playerProps.mode === 'shuffle' &&
                            <Icon name="Shuffle" onClick={() => setPlayerProps(prev => ({ ...prev, mode: 'repeat' }))} />
                        }
                        {playerProps.mode === 'repeat' &&
                            <Icon name="Repeat" onClick={() => setPlayerProps(prev => ({ ...prev, mode: 'repeatOne' }))} />
                        }
                        {playerProps.mode === 'repeatOne' &&
                            <Icon name="RepeatOne" onClick={() => setPlayerProps(prev => ({ ...prev, mode: 'shuffle' }))} />
                        }
                    </div>
                    <div className='volume__range'>
                        {!volume.muted ? (
                            <Icon name="VolumeFull" onClick={() => player!.volume = 0} />
                        ) : (
                            <Icon name="Mute" onClick={() => player!.volume = 1} />
                        )}
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume.rate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => player!.volume = Number(e.target.value)}
                            style={{ backgroundSize: `${(volume.rate * 100) / 1}% 100%` }}
                        />
                    </div>
                </div>
            </div>
            {/* <AudioVisualizer isPlaying={track.isPlaying} /> */}
        </MusicPlayer>
    )
}

export default PlayerBar

/**
 * 
 */

const MusicPlayer = styled.div`
    position         : relative;
    width            : 100%;
    padding          : 35px 20px 15px;
    background-color : var(--content-light);
    box-shadow       : var(--shadow-top), var(--shadow-relief);

    @media(max-width: 768px) {
        padding : 35px 10px 10px;
    }
    @media(max-width: 576px) {
        padding : 12px 10px;
    }

    .player__inner {
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        width           : 100%;
        max-width       : 992px;
        margin          : 0 auto;
    }

    .player__actions {
        display     : flex;
        align-items : center;
        white-space : nowrap;
        color       : var(--text);

        .player__action-back,
        .player__action-next {
            display     : flex;
            align-items : center;
            padding     : 3px;
            cursor      : pointer;
            svg {
                height : 24px;
                width  : 24px;
            }
            &:hover {
                background-color : var(--content);
                border-radius    : var(--rounded-full);
            }
        }

        .player__action-play {
            position         : relative;
            display          : flex;
            align-items      : center;
            height           : 42px;
            width            : 42px;
            margin           : 0 4px;
            background-color : var(--primary);
            border-radius    : var(--rounded-full);
            color            : var(--content);
            cursor           : pointer;
            svg {
                position  : absolute;
                top       : 50%;
                left      : 50%;
                transform : translate(-50%, -50%);
                height    : 24px;
                width     : 24px;
            }
            .player__icon-play {
                left   : 54%;
                height : 22px;
                width  : 22px;
            }
            &:hover {
                background-color : var(--primary-light);
            }
        }
    }

    .player__tools {
        display     : flex;
        align-items : center;

        .volume__range {
            display          : flex;
            align-items      : center;
            height           : 100%;
            width            : 130px;
            /* background-color : var(--content-light); */
            cursor           : pointer;
            svg {
                margin-right : 10px;
            }
            @media(max-width: 992px) {
                display : none;
            }
        }

        .suffle__repeat {
            display       : flex;
            align-items   : center;
            padding-right : 30px;
            cursor        : pointer;
            svg {
                height : 20px;
                width  : 20px;
            }
            &:hover {
                color : var(--primary);
            }
            @media(max-width: 992px) {
                padding-right : 0;
            }
        }
    }

    .player__title {
        position : absolute;
        left     : 90px;
        top      : -35px;
        cursor   : pointer;
        p {
            max-width          : 350px;
            line-height        : 16px;
            text-overflow      : ellipsis;
            overflow           : hidden;
            display            : -webkit-box;
            -webkit-line-clamp : 1;
            -webkit-box-orient : vertical;

            &:first-child {
                font-weight : 500;
            }
            &:last-child {
                font-size   : 12px;
                color       : var(--text-secondary);
                font-weight : 300;
            }
        }
        @media(max-width: 992px) {
            left : 70px;
        }
        @media(max-width: 576px) {
            left       : 10px;
            top        : -16px;
            max-width  : 380px;
            max-height : 30px;
        }
    }

    .music__range {
        position         : relative;
        display          : flex;
        align-items      : center;
        height           : 100%;
        width            : 100%;
        padding          : 0 40px;
        /* background-color : var(--content-light); */

        .timestamp {
            font-size   : 12px;
            line-height : 14px;
            min-width   : 50px;
            &.start {
                padding-right : 15px;
            }
            &.end {
                padding-left : 15px;
            }
        }

        @media(max-width: 992px) {
            padding    : 0 20px;
            margin-top : 4px;
        }
        @media(max-width: 576px) {
            .timestamp,
            input {
                display : none;
            }
        }
    }
`