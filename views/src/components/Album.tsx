import React from 'react'
import styled from 'styled-components'
import Icon from './tools/icons/Icon'

interface Props {
    album: any,
    onClick: () => void
}

const Album: React.FC<Props> = ({ album, onClick }) => {
    const { picture } = album.songs[0].metadatas.common
    return (
        <AlbumItem onClick={onClick}>
            <div className='album__item-left'>
                {picture ? <img src={picture} alt={album.title} className='album__item-picture' /> : <Icon name="CD" className='album__item-icon' />}
                <div className='album__item-infos'>
                    <div className='album__item-title'>
                        {album.title || 'Unknown albums'}
                    </div>
                    <div className='album__item-artist'>
                        <span>{album.artist || 'Unknown artist'}</span>
                        <span>{album.artist && album.year && '|'}</span>
                        <span>{album.year && album.year}</span>
                    </div>
                </div>
            </div>
            <div className='album__item-time'>
                <Icon name="CaretRight" />
            </div>
        </AlbumItem>
    )
}

export default Album

const AlbumItem = styled.div`
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
        .album__item-icon {
            color : var(--primary);
        }
    }

    .album__item-left {
        display     : flex;
        align-items : center;
    }

    .album__item-picture {
        height        : 50px;
        width         : 50px;
        object-fit    : cover;
        border-radius : var(--rounded-md);
    }

    .album__item-icon {
        padding          : 12px;
        border-radius    : var(--rounded-md);
        min-height       : 50px;
        height           : 50px;
        min-width        : 50px;
        width            : 50px;
        color            : var(--svg);
        background-color : var(--x-light);
    }

    .album__item-infos {
        padding-left : 15px;

        .album__item-title {
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

        .album__item-artist {
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

    .album__item-time {
        padding-right : 10px;
        color         : var(--text-secondary);
        svg {
            width  : 16px;
            height : 16px;
        }
    }
`