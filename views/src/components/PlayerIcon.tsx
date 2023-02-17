import React from 'react'
import styled from 'styled-components'
import Icon from './tools/icons/Icon'

interface Props {
    isPlaying: boolean
    currentTime: number
    duration: number,
    minified?: boolean
}

const PlayerIcon: React.FC<Props> = ({ isPlaying, currentTime, duration, minified }) => {
    return (
        <AnimatedPlayerIcon className={minified ? 'minified' : 'normal'}>
            {isPlaying ? (
                <Icon name='Pause' className='list__item-pause' />
            ) : (
                <Icon name='Play' className='list__item-play' />
            )}
            {!minified ? (
                <svg className="track" height="50" width="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="22.5"
                        strokeDasharray={141.37}
                        strokeDashoffset={(141.37 - ((currentTime / duration * 100) * 1.4137)) || 141.37}
                    />
                </svg>
            ) : (
                <svg className="track" height="40" width="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18"
                        strokeDasharray={113.04}
                        strokeDashoffset={(113.04 - ((currentTime / duration * 100) * 1.1304)) || 113.04}
                    />
                </svg>
            )}
        </AnimatedPlayerIcon>
    )
}

export default PlayerIcon

const AnimatedPlayerIcon = styled.div`
    position         : relative;
    border-radius    : var(--rounded-full);
    height           : 50px;
    width            : 50px;
    color            : var(--svg);
    background-color : var(--x-light);

    .list__item-play,
    .list__item-pause {
        position  : absolute;
        top       : 50%;
        left      : 50%;
        transform : translate(-50%, -50%);
        height    : 24px;
        width     : 24px;
        color     : var(--primary);
        z-index   : 1;
    }
    .list__item-play {
        left  : 54%;
    }
    .track {
        position  : relative;
        fill      : var(--x-light);
        transform : rotate(-90deg);
        z-index   : 0;
        circle {
            stroke            : var(--primary);
            stroke-width      : 4;
            /* stroke-dasharray  : 141.37; */
            /* stroke-dashoffset : 141.37; */
        }
    }

    &.minified {
        height : 40px;
        width  : 40px;
        .list__item-play {
            height : 20px;
            width  : 20px;
        }
    }
`