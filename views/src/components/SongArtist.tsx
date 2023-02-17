import React from 'react'
import styled from 'styled-components'
import { PlayerContext, TrackContext } from '../AppContext'
import { onMusicClick } from './functions/functions'
import usePlayer from './functions/usePlayer'
import PlayerIcon from './PlayerIcon'
import { AudioLoader, AudioLoaderActive } from './tools/loader/AudioLoader'
import { addActive, timeFormat } from './tools/Utils'

interface Props {
    artist: any,
    music: any,
    uniqueKey: number
}

const SongArtist: React.FC<Props> = ({ artist, music, uniqueKey }) => {
    const { track, setTrack } = React.useContext(TrackContext)
    const { player } = React.useContext(PlayerContext)
    const { timeRange } = usePlayer(player)

    const context = { name: 'artist', artist: artist.artist.name, songs: artist.artist.songs }

    return (
        <ArtistSongItem className={addActive(track.song._id === music._id)}
            tabIndex={uniqueKey}
            onClick={() => {
                onMusicClick(track, setTrack, music, player, context)
                localStorage.setItem('musicContext', JSON.stringify({ name: 'artist', artist: artist.artist.name }))
            }}
        >
            <div className='album-list__item-left'>
                {track.song._id === music._id ? (
                    <PlayerIcon
                        isPlaying={track.isPlaying}
                        currentTime={timeRange.currentTime}
                        duration={timeRange.duration}
                        minified={true}
                    />
                ) : (
                    <div className='album-list__item-icon'>
                        {uniqueKey < 9 ? '0' + (uniqueKey + 1) : uniqueKey + 1}
                    </div>
                )}
                <div className='album-list__item-infos'>
                    <div className='album-list__item-title'>
                        {music.title}
                    </div>
                    <div className='album-list__item-artist'>
                        <span>{music.metadatas.common.artist ? music.metadatas.common.artist : 'Artiste inconnu'}</span>
                        <span>{music.metadatas.common.artist && music.metadatas.common.album && '|'}</span>
                        <span>{music.metadatas.common?.album}</span>
                    </div>
                </div>
            </div>
            <div className='album-list__item-time'>
                {track.song._id === music._id && (
                    track.isPlaying ? (
                        <AudioLoaderActive className='list__item-animation' />
                    ) : (
                        <AudioLoader className='list__item-animation' />
                    ))}
                {timeFormat(music.metadatas.format.duration)}
            </div>
        </ArtistSongItem>
    )
}

export default SongArtist

const ArtistSongItem = styled.div`
    position      : relative;
    display       : flex;
    align-items   : center;
    padding       : 10px 0;
    border-radius : var(--rounded-sm);
    cursor        : pointer;
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
    }
    &.active {
        .album-list__item-title,
        .album-list__item-icon {
            color : var(--primary)
        }
        .album-list__item-animation {
            display : block;
        }
    }

    @media (max-width: 992px) {
        padding : 10px 0;
        &:hover {
            background-color : var(--content);
        }
    }

    .album-list__item-left {
        display     : flex;
        align-items : center;
        width       : 70%;
    }

    .album-list__item-icon {
        position  : relative;
        min-width : 20px;
    }

    .album-list__item-infos {
        padding-left : 15px;

        .album-list__item-title {
            font-weight        : 500;
            line-height        : 24px;
            text-overflow      : ellipsis;
            overflow           : hidden;
            width              : 100%;
            max-height         : 25px;
            display            : -webkit-box;
            -webkit-line-clamp : 1;
            -webkit-box-orient : vertical;
        }

        .album-list__item-artist {
            text-overflow      : ellipsis;
            overflow           : hidden;
            width              : 100%;
            font-size          : 12px;
            line-height        : 19px;
            color              : var(--text-secondary);
            max-height         : 22px;
            display            : -webkit-box;
            -webkit-line-clamp : 1;
            -webkit-box-orient : vertical;

            span {
                &:nth-child(2) {
                    margin : 0 5px;
                }
            }
        }
    }

    .album-list__item-time {
        width           : 30%;
        display         : flex;
        align-items     : center;
        justify-content : flex-end;
        color           : var(--text);
        font-size       : 13px;
    }

    .list__item-animation {
        height  : 25px;
        color   : var(--primary);
    }
`