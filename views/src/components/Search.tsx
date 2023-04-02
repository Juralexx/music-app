import React from 'react'
import styled from 'styled-components'
import { MusicsContext, TrackContext } from '../AppContext'
import AlbumSongs from './AlbumSongs'
import ArtistSongs from './ArtistSongs'
import Song from './Song'
import SongActive from './SongActive'
import Artist from './Artist'
import Album from './Album'
import Icon from './tools/icons/Icon'
import { IconInput } from './tools/Inputs'
import { addActive, removeAccents } from './tools/Utils'
import { Logo } from './tools/Logo'
import { IAlbum, IArtist, SearchProps } from '../types/types'

interface Props {
    isSearching: boolean,
    setSearching: React.Dispatch<React.SetStateAction<boolean>>
}

const Search: React.FC<Props> = ({ isSearching, setSearching }) => {
    const { musics } = React.useContext(MusicsContext)
    const { track } = React.useContext(TrackContext)

    const [search, setSearch] = React.useState<SearchProps.Props>(SearchProps.defaultProps)

    const artists = Object.entries(musics.artists).map(([key, value]) => ({ type: 'artist', name: key, songs: value }))
    const albums = Object.entries(musics.albums).map(([_, value]) => ({ type: 'album', ...value })).filter(e => e.title !== undefined)

    /**
     * 
     */

    const launchSearch = (query: string) => {
        setSearch(prev => ({ ...prev, query: query }))

        let isEmpty = !search.results || search.results.length === 0
        let regexp = new RegExp(removeAccents(query), 'i')

        if (!search.query || query.trim() === "") return
        if (query.length >= 2) {
            const songsResults = musics.all.filter((music: any) => regexp.test(removeAccents(music['title'])))
            const albumsResults = albums.filter((album: any) => regexp.test(removeAccents(album['title'])))
            const artistsResults = artists.filter((artist: any) => regexp.test(removeAccents(artist['name'])))

            const results = [...songsResults.slice(0, 8), ...albumsResults.slice(0, 8), ...artistsResults.slice(0, 8)]
            setSearch(prev => ({ ...prev, results: results, songsResults: songsResults, albumsResults: albumsResults, artistsResults: artistsResults }))

            if (search.type === 'all') {
                setSearch(prev => ({ ...prev, filteredResults: results }))
                if (isEmpty) return
            } else if (search.type === 'songs') {
                setSearch(prev => ({ ...prev, filteredResults: songsResults }))
                if (isEmpty) return
            } else if (search.type === 'albums') {
                setSearch(prev => ({ ...prev, filteredResults: albumsResults }))
                if (isEmpty) return
            } else if (search.type === 'artists') {
                setSearch(prev => ({ ...prev, filteredResults: artistsResults }))
                if (isEmpty) return
            }
        } else setSearch(prev => ({ ...prev, results: [], filteredResults: [] }))

        let musicsTitles = document.getElementsByClassName('music__item-title');
        let albumsTitles = document.getElementsByClassName('album__item-title');
        let artistName = document.getElementsByClassName('artist__item-title');
        let regex = new RegExp(query, 'i');

        for (let i = 0; i < musicsTitles.length; i++) {
            musicsTitles[i].innerHTML = (musicsTitles[i] as HTMLElement).innerText.replace(regex, (match: any) => `<span class="highlight">${match}</span>`);
        }
        for (let i = 0; i < albumsTitles.length; i++) {
            albumsTitles[i].innerHTML = (albumsTitles[i] as HTMLElement).innerText.replace(regex, (match: any) => `<span class="highlight">${match}</span>`);
        }
        for (let i = 0; i < artistName.length; i++) {
            artistName[i].innerHTML = (artistName[i] as HTMLElement).innerText.replace(regex, (match: any) => `<span class="highlight">${match}</span>`);
        }
    }

    /**
     * 
     */

    const [album, setAlbum] = React.useState<IAlbum.Props>({ active: false, ...albums[0] })
    const [artist, setArtist] = React.useState<IArtist.Props>({ active: false, ...artists[0] })

    return (
        <SearchContainer className={isSearching ? 'vanish-right' : 'vanish-left'}>
            <div className='search__container-top'>
                <Icon name="DoubleArrowLeft" onClick={() => setSearching(false)} />
                <IconInput
                    type="text"
                    placeholder="Search..."
                    className="is_end_icon"
                    endIcon={<Icon name="Search" />}
                    value={search.query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => launchSearch(e.target.value)}
                    cross
                    endIconClick={() => setSearch(prev => ({ ...prev, query: '' }))}
                />
            </div>
            <div className='search__choices'>
                <div className={`search__choice ${addActive(search.type === 'all')}`}
                    onClick={() => setSearch(prev => ({ ...prev, type: 'all', filteredResults: search.results }))}
                >
                    <Icon name="List" />
                </div>
                <div className={`search__choice ${addActive(search.type === 'songs')}`}
                    onClick={() => setSearch(prev => ({ ...prev, type: 'songs', filteredResults: search.songsResults }))}
                >
                    <Icon name="Music" />
                </div>
                <div className={`search__choice ${addActive(search.type === 'albums')}`}
                    onClick={() => setSearch(prev => ({ ...prev, type: 'albums', filteredResults: search.albumsResults }))}
                >
                    <Icon name="CD" />
                </div>
                <div className={`search__choice ${addActive(search.type === 'artists')}`}
                    onClick={() => setSearch(prev => ({ ...prev, type: 'artists', filteredResults: search.artistsResults }))}
                >
                    <Icon name="Micro" />
                </div>
            </div>
            {search.filteredResults.length > 0 &&
                <div className='search__results'>
                    {search.filteredResults.map((element: any, i: number) => {
                        return (
                            <div key={i}>
                                {!element.type && (
                                    track.song._id !== element._id ? (
                                        <Song
                                            music={element}
                                            context={{ name: "all" }}
                                            contextSongs={musics.all}
                                        />
                                    ) : (
                                        <SongActive
                                            context={{ name: "all" }}
                                            contextSongs={musics.all}
                                        />
                                    ))
                                }
                                {element.type === 'album' &&
                                    <Album
                                        album={element}
                                        onClick={() => setAlbum({ ...element, active: true })}
                                    />
                                }
                                {element.type === 'artist' &&
                                    <Artist
                                        artist={element}
                                        onClick={() => setArtist({ ...element, active: true })}
                                    />
                                }
                            </div>
                        )
                    })}
                </div>
            }
            {search.filteredResults.length === 0 &&
                <div className='search__results-full'>
                    <div className='search__results-empty'>
                        <Logo />
                        <p>Nothing to show...</p>
                    </div>
                </div>
            }
            {isSearching &&
                <AlbumSongs
                    album={album}
                    setAlbum={setAlbum}
                />
            }
            {isSearching &&
                <ArtistSongs
                    artist={artist}
                    setArtist={setArtist}
                />
            }
        </SearchContainer>
    )
}

export default Search

const SearchContainer = styled.div`
    position         : absolute;
    width            : 100%;
    height           : 100vh;
    top              : 0;
    left             : 0;
    right            : 0;
    bottom           : 0;
    padding          : 10px 20px 30px;
    background-color : var(--content);
    z-index          : 100;
    transition       : .3s ease;

    @media (max-width: 992px) {
        top : -108px;
    }
        
    .icon-input {
        max-width   : 100%;
        width       : 100%;
        margin-left : 10px;
    }

    .search__container-top {
        display     : flex;
        align-items : center;
        
        > svg {
            width         : 40px;
            height        : 40px;
            padding       : 5px;
            border-radius : var(--rounded-full);
            cursor        : pointer;
            &:hover {
                color      : var(--primary);
                background : var(--content-x-light);
            }
        }
    }

    .search__choices {
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        width           : 100%;
        padding         : 20px 0;

        .search__choice {
            padding          : 7px 0;
            width            : 24%;
            background-color : var(--content-x-light);
            border-radius    : var(--rounded-sm);
            cursor           : pointer;

            &.active,
            &:hover {
                background-color : rgba(var(--primary-rgb), 0.12);
                color            : var(--primary);
            }
        }

        svg {
            margin : 0 auto;
        }
    }

    .highlight {
        color       : var(--primary);
        font-weight : 600;
    }

    .search__results {
        display               : grid;
        grid-template-columns : 1fr;
        width                 : 100%;
        height                : auto;
        max-height            : calc(100% - 100px);
        padding-bottom        : 40px;
        overflow-y            : auto;
    }

    .search__results-full {
        display         : flex;
        align-items     : center;
        justify-content : center;
        height          : 350px;
        width           : 100%;
        padding         : 10px 0;
    }

    .search__results-empty {
        svg {
            margin : 0 auto;
            height : 100px;
            width  : 100px;
            color  : var(--primary);
        }
        p {
            font-size   : 16px;
            padding     : 10px 0;
            font-weight : 500;
        }
    }
`