import React from 'react'
import styled from 'styled-components'
import { MusicsContext, TrackContext } from '../AppContext'
import { AlbumInterface } from './pages/Albums'
import { ArtistInterface } from './pages/Artists'
import AlbumSongs from './AlbumSongs'
import ArtistSongs from './ArtistSongs'
import Song from './Song'
import SongActive from './SongActive'
import Artist from './Artist'
import Album from './Album'
import Icon from './tools/icons/Icon'
import { IconInput } from './tools/Inputs'
import { addActive, removeAccents } from './tools/Utils'

export interface SearchProps {
    state: boolean,
    query: string,
    type: string,
    results: any,
    filteredResults: any
}

const defaultSearchProps: SearchProps = {
    state: false,
    query: '',
    type: 'all',
    results: [],
    filteredResults: []
}

interface Props {
    isSearching: boolean,
    setSearching: React.Dispatch<React.SetStateAction<any>>
}

const Search: React.FC<Props> = ({ isSearching, setSearching }) => {
    const { musics } = React.useContext(MusicsContext)
    const { track } = React.useContext(TrackContext)

    const [search, setSearch] = React.useState<SearchProps>(defaultSearchProps)

    const artists = Object.entries(musics.artists).map(([key, value]) => ({ type: 'artist', name: key, songs: value }))
    const albums = Object.entries(musics.albums).map(([_, value]) => ({ type: 'album', ...value })).filter(e => e.title !== undefined)

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

            setSearch(prev => ({ ...prev, results: results, filteredResults: results }))
            if (isEmpty) {
                return
            }
        }
    }
    const [album, setAlbum] = React.useState<AlbumInterface>({ active: false, album: albums[0] })
    const [artist, setArtist] = React.useState<ArtistInterface>({ active: false, artist: musics.artists[0] })

    return (
        <SearchContainer className={isSearching ? 'vanish-right' : 'vanish-left'}>
            <div className='search__container-top'>
                <Icon name="CaretLeft" onClick={() => setSearching(false)} />
                <IconInput
                    type="text"
                    placeholder="Rechercher..."
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
                    onClick={() => setSearch(prev => ({ ...prev, type: 'songs', filteredResults: search.results.filter((e: any) => e.type !== 'artist' && e.type !== 'album') }))}
                >
                    <Icon name="Music" />
                </div>
                <div className={`search__choice ${addActive(search.type === 'albums')}`}
                    onClick={() => setSearch(prev => ({ ...prev, type: 'albums', filteredResults: search.results.filter((e: any) => e.type === 'album') }))}
                >
                    <Icon name="CD" />
                </div>
                <div className={`search__choice ${addActive(search.type === 'artists')}`}
                    onClick={() => setSearch(prev => ({ ...prev, type: 'artists', filteredResults: search.results.filter((e: any) => e.type === 'artist') }))}
                >
                    <Icon name="Micro" />
                </div>
            </div>
            <div className='search__results'>
                {search.filteredResults.length > 0 &&
                    search.filteredResults.map((element: any, i: number) => {
                        return (
                            <div key={i}>
                                {!element.type && (
                                    track.song._id !== element._id ? (
                                        <Song music={element} />
                                    ) : (
                                        <SongActive />
                                    ))
                                }
                                {element.type === 'album' &&
                                    <Album
                                        album={element}
                                        onClick={() => setAlbum({ active: true, album: element })}
                                    />
                                }
                                {element.type === 'artist' &&
                                    <Artist
                                        artist={element}
                                        onClick={() => setArtist({ active: true, artist: element })}
                                    />
                                }
                            </div>
                        )
                    })
                }
            </div>
            {album?.album !== undefined &&
                <AlbumSongs
                    album={album}
                    setAlbum={setAlbum}
                />
            }
            {artist.artist !== undefined &&
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

    .search__results {
        display               : grid;
        grid-template-columns : 1fr;
        width                 : 100%;
        height                : auto;
        padding-bottom        : 40px;
        overflow-y            : auto;
    }
`