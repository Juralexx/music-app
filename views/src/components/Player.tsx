import React from 'react'
import styled from 'styled-components'
import { TrackContext, PlayerContext, PlayerPropsContext } from '../AppContext';
import { Logo } from './tools/Logo';
import Icon from './tools/icons/Icon'
import { addActive, timeFormat } from './tools/Utils';
import usePlayer from './functions/usePlayer';
import { useClickOutside } from './tools/hooks/useClickOutside'
import { changeSong, onPlayerClick } from './functions/functions';
import AudioVisualizer from './PlayerVisualizer';

const Player = () => {
    const { track, setTrack } = React.useContext(TrackContext)
    const { playerProps, setPlayerProps } = React.useContext(PlayerPropsContext)
    const { player } = React.useContext(PlayerContext)

    const { timeRange, volume } = usePlayer(player)

    const volumeRef = React.useRef<HTMLDivElement>(null)
    const [openVolume, setOpenVolume] = React.useState<boolean>(false)
    useClickOutside(volumeRef, () => setOpenVolume(false))

    return (
        <PlayerContainer className={addActive(playerProps.open)}>
            <div className='player__top'>
                <div className='player__top-left' onClick={() => setPlayerProps(prev => ({ ...prev, open: false }))}>
                    <Icon name="DoubleArrowLeft" />
                    <p>{track?.song?.title}</p>
                </div>
            </div>
            <div className="player__card">
                <div className='player__img'>
                    {track.isPlaying ? <Logo /> : <Logo />}
                    <AudioVisualizer isPlaying={track.isPlaying} />
                </div>
                <div className='player__title'>
                    <div className='player__title-song_name'>
                        {track?.song?.title}
                    </div>
                    <div className='player__title-song_artist'>
                        {track?.song?.artist || 'Artiste inconnu'}
                    </div>
                </div>
                <div className='player__timestamp'>
                    <div>{timeFormat(timeRange.currentTime)}</div>
                    <div>{timeFormat(timeRange.remainingTime)}</div>
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
                <div className='player__actions'>
                    <div className='player__action-suffle__repeat'>
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
                    <div className="player__action-back" onClick={() => setTrack(prev => ({ ...prev, song: changeSong('backward', track) }))}>
                        <Icon name="Backward" />
                    </div>
                    <div className="player__action-play" onClick={() => onPlayerClick(track, setTrack, player)}>
                        {track.isPlaying ? (
                            <Icon name='Pause' />
                        ) : (
                            <Icon name='Play' className="player__action-icon-play" />
                        )}
                    </div>
                    <div className="player__action-next" onClick={() => setTrack(prev => ({ ...prev, song: changeSong('forward', track) }))}>
                        <Icon name="Forward" />
                    </div>
                    <div className='player__action-volume' ref={volumeRef}>
                        <Icon name={!volume.muted ? 'VolumeFull' : 'Mute'} onClick={() => setOpenVolume(!openVolume)} />
                        {openVolume &&
                            <div className='volume__range'>
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
                        }
                    </div>
                </div>
            </div>
        </PlayerContainer>
    )
}

export default Player

const PlayerContainer = styled.div`
    position        : absolute;
    top             : 100%;
    left            : 0;
    right           : 0;
    bottom          : 0;
    width           : 100%;
    height          : 100%;
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : center;
    padding-top     : 30px;
    background      : var(--content);
    z-index         : 1000;
    opacity         : 0;
    transition      : .5s ease;

    &.active {
        top        : 0;
        opacity    : 1;
        transition : .3s ease;
    }

    .player__top {
        position        : absolute;
        top             : 0;
        left            : 0;
        right           : 0;
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        padding         : 15px 15px;

        .player__top-left {
            display     : flex;
            align-items : center;
            cursor      : pointer;
            p {
                max-width          : 300px;
                font-weight        : 500;
                font-size          : 16px;
                text-overflow      : ellipsis;
                overflow           : hidden;
                display            : -webkit-box;
                -webkit-line-clamp : 1;
                -webkit-box-orient : vertical;
            }
            svg {
                width         : 30px;
                height        : 30px;
                padding       : 5px;
                margin-right  : 5px;
                border-radius : var(--rounded-full);
                &:hover {
                    color      : var(--primary);
                    background : var(--content-x-light);
                }
            }
        }
    }

    .player__card {
        margin    : auto;
        width     : 100%;
        max-width : 450px;

        @media (max-width: 576px) {
            max-width : 450px;
        }
    }
    
    .player__img {
        display         : flex;
        align-items     : center;
        justify-content : center;
        width           : 300px;
        height          : 300px;
        padding         : 40px;
        color           : var(--primary);
        background      : var(--x-light);
        backdrop-filter : blur(5px);
        border-radius   : var(--rounded-2xl);
        margin          : 0 auto;

        svg {
            width  : 170px;
            height : 170px;
        }
    }

    .player__title {
        text-align : center;
        margin     : 20px 0;

        .player__title-song_name {
            font-size          : 20px;
            font-weight        : 600;
            margin-bottom      : 5px;
            text-overflow      : ellipsis;
            overflow           : hidden;
            display            : -webkit-box;
            -webkit-line-clamp : 1;
            -webkit-box-orient : vertical;
        }

        .player__title-song_artist {
            font-size     : 14px;
            color         : var(--text-secondary);
            margin-bottom : 5px;
        }
    }

    .player__timestamp {
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        font-size       : 12px;
        margin-bottom   : 5px;
    }

    .player__actions {
        position        : relative;
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        padding         : 20px 0;
        margin-top      : 10px;
        white-space     : nowrap;
        color           : var(--text);

        .player__action-back,
        .player__action-next,
        .player__action-suffle__repeat,
        .player__action-volume {
            display         : flex;
            align-items     : center;
            justify-content : center;
            width           : 36px;
            height          : 36px;
            cursor          : pointer;
            svg {
                height : 22px;
                width  : 24px;
            }
            &:hover {
                background-color : var(--content-light);
                border-radius    : var(--rounded-full);
            }
        }

        .player__action-play {
            position         : relative;
            display          : flex;
            align-items      : center;
            height           : 55px;
            width            : 55px;
            padding          : 2px;
            background-color : var(--primary);
            border-radius    : var(--rounded-full);
            color            : var(--content);
            cursor           : pointer;
            svg {
                position  : absolute;
                top       : 50%;
                left      : 50%;
                transform : translate(-50%, -50%);
                height    : 34px;
                width     : 34px;
            }
            .player__action-icon-play {
                left   : 54%;
                width  : 28px;
                height : 28px;
            }
            &:hover {
                background-color : var(--primary-light);
            }
        }
    }

    .volume__range {
        position         : absolute;
        right            : -62px;
        bottom           : 130px;
        display          : flex;
        justify-content  : center;
        transform        : rotate(-90deg);
        background-color : rgba(255, 255, 255, 0.2);
        backdrop-filter  : blur(5px);
        padding          : 15px 15px;
        border-radius    : var(--rounded-full);
    }

    .__visualizer {
        position : absolute;
        bottom   : 0;
        left     : 0;
        right    : 0;
        width    : 100%;
        height   : 150px;
        opacity  : 0.25;
        border-radius: var(--rounded-2xl);
    }
`