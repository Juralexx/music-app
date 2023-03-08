import React from 'react'
import styled from 'styled-components'
import { MusicsContext } from '../../AppContext'
import { IPlaylist } from '../../types/types'
import Playlist from '../Playlist'
import PlaylistAdd from '../PlaylistAdd'
import Icon from '../tools/icons/Icon'
import { Logo } from '../tools/Logo'

const Playlists: React.FC = () => {
    const { playlists } = React.useContext(MusicsContext)
    const [playlist, setPlaylist] = React.useState<IPlaylist.Props>({ active: false, ...playlists[0] })
    const [addPlaylist, setAddPlaylist] = React.useState<boolean>(false)

    return (
        <PlaylistsContainer>
            <h2>Playlists <Icon name="Plus" className="__playlist-add" onClick={() => setAddPlaylist(true)} /></h2>
            <div className='playlist__grid'>
                {playlists.length > 0 &&
                    playlists.map((playlist: any, i: number) => {
                        const picture = playlist.songs[0].metadatas.common?.picture
                        return (
                            <div className='__playlist' key={i} onClick={() => setPlaylist({ active: true, ...playlist })}>
                                <div className='__playlist-img'>
                                    {picture ? <img src={picture} alt={playlist.name} /> : <Logo />}
                                    <Icon name="Play" className="__playlist-play" />
                                </div>
                                <div className='__playlist-title'>
                                    {playlist.name}
                                </div>
                                <div className='__playlist-subtitle'>
                                    {playlist.songs.length} song{playlist.songs.length > 1 && <span>s</span>}
                                </div>
                            </div>
                        )
                    })}
            </div>
            <Playlist
                playlist={playlist}
                setPlaylist={setPlaylist}
            />
            <PlaylistAdd
                addPlaylist={addPlaylist}
                setAddPlaylist={setAddPlaylist}
            />
        </PlaylistsContainer>
    )
}

export default Playlists

const PlaylistsContainer = styled.div`
    position    : relative;
    width       : 100%;
    height      : 100%;
    margin      : auto;
    padding-top : 20px;
    overflow    : hidden;

    h2 {
        padding : 0 30px 5px;

        .__playlist-add {
            display          : inline-block;
            height           : 28px;
            width            : 28px;
            padding          : 3px;
            color            : var(--primary);
            background-color : rgba(var(--primary-rgb), 0.12);
            border-radius    : var(--rounded-full);
            cursor           : pointer;
            margin-left      : 10px;
            &:hover {
                background-color : rgba(var(--primary-rgb), 0.17);
            }
        }
    }

    @media (max-width: 992px) {
        h2 {
            display         : flex;
            justify-content : space-between;
            padding         : 0 15px 5px;
            font-size       : 20px;
            margin-bottom   : 10px;
        }
    }

    .playlist__grid {
        position              : relative;
        width                 : 100%;
        height                : 100%;
        padding               : 0 25px 50px;
        display               : grid;
        grid-template-columns : repeat(5, calc(20% - 12px));
        grid-gap              : 15px;
        align-items           : flex-start;
        overflow-y            : auto;
        overflow-x            : hidden;

        @media(max-width: 1200px) {
            grid-template-columns : repeat(4, calc(25% - 12px));
        }
        @media (max-width: 992px) {
            height                : calc(100% - 35px);
            padding               : 0 15px 50px;
            grid-template-columns : repeat(3, calc(33.33% - 12px));
        }
        @media (max-width: 576px) {
            grid-template-columns : 1fr 1fr;
        }
    }

    .__playlist {
        display : inline-block;
        height  : auto;
        cursor  : pointer;
    }

    .__playlist-img {
        position         : relative;
        border-radius    : var(--rounded-md);
        width            : 100%;
        height           : 200px;
        color            : var(--svg);
        background-color : var(--x-light);

        img {
            width         : 100%;
            height        : 100%;
            object-fit    : cover;
            border-radius : var(--rounded-md);
        }

        svg:not(.__playlist-play) {
            position  : absolute;
            top       : 50%;
            left      : 50%;
            transform : translate(-50%, -50%);
            height    : calc(100% - 50px);
            width     : calc(100% - 50px);
            color     : var(--primary);
        }

        @media (max-width: 576px) {
            width  : 100%;
            height : 200px;
        }
        @media (max-width: 440px) {
            height : 150px;
        }
    }

    .__playlist-play {
        position         : absolute;
        bottom           : 5px;
        right            : 5px;
        height           : 35px;
        width            : 35px;
        padding          : 6px 6px 6px 9px;
        background-color : var(--primary);
        border-radius    : var(--rounded-full);
        color            : var(--content);
    }

    .__playlist-title,
    .__playlist-subtitle {
        text-align         : center;
        line-height        : 18px;
        text-overflow      : ellipsis;
        overflow           : hidden;
        width              : 100%;
        display            : -webkit-box;
        -webkit-line-clamp : 1;
        -webkit-box-orient : vertical;
    }

    .__playlist-title {
        margin-top  : 8px;
        font-size   : 18px;
        font-weight : 500;
    }
    
    .__playlist-subtitle {
        margin-top : 5px;
        color      : var(--text-secondary);
    }

    /**
     *
     */

    .__container {
        position   : relative;
        height     : 100%;
        width      : 100%;
        padding    : 0 25px;
        overflow-y : auto;
        overflow-y : hidden;
        overflow-x : hidden;

        @media (max-width: 992px) {
            padding : 0 8px 0 10px;
        }

        p {
            font-size     : 16px;
            margin-bottom : 5px;
        }
    }

    .list__title {
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        padding         : 5px 0 10px;
        width           : 100%;

        > div {
            display     : flex;
            align-items : center;
        }
        
        .__back {
            width         : 36px;
            height        : 36px;
            flex-shrink   : 0;
            padding       : 5px;
            border-radius : var(--rounded-full);
            background    : var(--content-light);
            cursor        : pointer;

            &:hover {
                color : var(--primary);
            }
        }

        h2 {
            padding-left       : 10px;
            padding-right      : 10px;
            padding-bottom     : 0;
            margin             : 0;
            font-size          : 22px;
            text-overflow      : ellipsis;
            overflow           : hidden;
            width              : 100%;
            display            : -webkit-box;
            -webkit-line-clamp : 1;
            -webkit-box-orient : vertical;
        }

        @media (max-width: 992px) {
            padding : 10px 0;
            h2 {
                font-size     : 16px;
                margin-bottom : 0;
                span {
                    font-size : 14px;
                }
            }
        }

        @media(max-width: 576px) {
            flex-direction : column;
            align-items    : flex-start;
        }
    }

    .list__container {
        position      : relative;
        height        : auto;
        width         : 100%;
        padding-right : 10px;
        overflow-y    : auto;

        &::-webkit-scrollbar {
            width : 0;
        }
    }

    .__list {
        display        : flex;
        height         : 100%;
        padding-bottom : 140px;
    }

    .__container-top {
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        margin-bottom   : 15px;

        @media(max-width: 576px) {
            flex-direction : column;

            .icon-input {
                width : 100%;
            }
        }
    }

    .__save-btn {
        font-size        : 16px;
        padding          : 10px 30px 8px;
        color            : var(--primary);
        background-color : rgba(var(--primary-rgb), 0.08);
        border-radius    : var(--rounded-sm);

        &:hover {
            background-color : rgba(var(--primary-rgb), 0.17);
        }

        @media(max-width: 576px) {
            width      : 100%;
            margin-top : 10px;
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

    .__song-choice {
        display     : flex;
        align-items : center;
        width       : 100%;

        .__checkbox {
            margin-left : 10px;
        }

        .music__item-left {
            width : 100%;
        }
        .music__item-time {
            display : none;
        }
    }
`