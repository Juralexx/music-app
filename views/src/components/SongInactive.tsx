import React from 'react'
import styled from 'styled-components'
import Icon from './tools/icons/Icon'
import { timeFormat } from './tools/Utils'

interface Props {
    music: { [key: string]: any }
}

const SongInactive: React.FC<Props> = ({ music }) => {
    const { picture, album, artist } = music.metadatas.common

    return (
        <SongItem className='music__item'>
            <div className='music__item-left'>
                <div className='music__item-icon'>
                    {picture ? <img src={picture} alt={music.title} /> : <Icon name="MusicFile" className='music__item-note' />}
                </div>
                <div className='music__item-infos'>
                    <div className='music__item-title'>
                        {music.title}
                    </div>
                    <div className='music__item-artist'>
                        <span>{artist ? artist : 'Unknown artist'}</span>
                        <span>{artist && album && '|'}</span>
                        <span>{album}</span>
                    </div>
                </div>
            </div>
            <div className='music__item-time'>
                {timeFormat(music.metadatas.format.duration)}
            </div>
        </SongItem>
    )
}

export default SongInactive

const SongItem = styled.div`
    position        : relative;
    display         : flex;
    align-items     : center;
    justify-content : space-between;
    flex-grow       : 1;
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

    .music__item-left {
        display     : flex;
        align-items : center;
        width       : 70%;
    }

    .music__item-icon {
        position         : relative;
        border-radius    : var(--rounded-md);
        height           : 50px;
        min-height       : 50px;
        width            : 50px;
        min-width        : 50px;
        color            : var(--svg);
        background-color : var(--x-light);

        img {
            width         : 100%;
            height        : 100%;
            object-fit    : cover;
            border-radius : var(--rounded-md);
        }

        .music__item-note {
            position  : absolute;
            top       : 50%;
            left      : 50%;
            transform : translate(-50%, -50%);
            height    : 24px;
            width     : 24px;
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
`