import React from 'react'
import styled from 'styled-components'
import { Song } from '../types/types'
import Icon from './tools/icons/Icon'

interface Props {
    artist: {
        name: string,
        songs: Array<Song.Props>
    },
    onClick: () => void
}

const Artist: React.FC<Props> = ({ artist, onClick }) => {
    return (
        <ArtistItem onClick={onClick}>
            <div className='artist__item-left'>
                <Icon name="Micro" className='artist__item-icon' />
                <div className='artist__item-infos'>
                    <div className='artist__item-title'>
                        {artist.name}
                    </div>
                    <div className='artist__item-artist'>
                        <span>{artist.songs.length} songs</span>
                    </div>
                </div>
            </div>
            <div className='artist__item-time'>
                <Icon name="CaretRight" />
            </div>
        </ArtistItem>
    )
}

export default Artist

const ArtistItem = styled.div`
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
        .artist__item-icon {
            color : var(--primary);
        }
    }

    .artist__item-left {
        display     : flex;
        align-items : center;
    }

    .artist__item-icon {
        padding          : 12px;
        border-radius    : var(--rounded-md);
        min-height       : 50px;
        min-width        : 50px;
        color            : var(--svg);
        background-color : var(--x-light);
    }

    .artist__item-infos {
        padding-left : 15px;

        .artist__item-title {
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

        .artist__item-artist {
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

    .artist__item-time {
        padding-right : 10px;
        color         : var(--text-secondary);
        svg {
            width  : 16px;
            height : 16px;
        }
    }
`