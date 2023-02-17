import React from 'react'
import styled from 'styled-components'
import { MusicsContext, PlayerContext, TrackContext } from '../AppContext'
import { onMusicClick } from './functions/functions'
import Icon from './tools/icons/Icon'
import { timeFormat } from './tools/Utils'

interface Props {
    music: { [key: string]: any }
}

const Song: React.FC<Props> = ({ music }) => {
    const { musics } = React.useContext(MusicsContext)
    const { track, setTrack } = React.useContext(TrackContext)
    const { player } = React.useContext(PlayerContext)

    return (
        <SongItem className='list__item'
            onClick={() => {
                onMusicClick(track, setTrack, music, player, musics.all)
                localStorage.setItem('musicContext', JSON.stringify({ name: 'all' }))
            }}
        >
            <div className='list__item-left'>
                <div className='list__item-icon'>
                    <Icon name="MusicFile" className='list__item-note' />
                </div>
                <div className='list__item-infos'>
                    <div className='list__item-title'>
                        {music.title}
                    </div>
                    <div className='list__item-artist'>
                        <span>{music.metadatas.common.artist ? music.metadatas.common.artist : 'Artiste inconnu'}</span>
                        <span>{music.metadatas.common.artist && music.metadatas.common.album && '|'}</span>
                        <span>{music.metadatas?.common?.album}</span>
                    </div>
                </div>
            </div>
            <div className='list__item-time'>
                {timeFormat(music.metadatas.format.duration)}
            </div>
        </SongItem>
    )
}

export default Song

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

        .list__item-note {
            position  : absolute;
            top       : 50%;
            left      : 50%;
            transform : translate(-50%, -50%);
            height    : 24px;
            width     : 24px;
            z-index   : 1;
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
`