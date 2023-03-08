import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import SwiperType from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import { LoadingContext, MusicsContext, TrackContext } from '../../AppContext';
import { IAlbum, IArtist } from '../../types/types';
import Icon from '../tools/icons/Icon';
import AlbumSongs from '../AlbumSongs';
import ArtistSongs from '../ArtistSongs';
import SongActive from '../SongActive';
import Song from '../Song';
import Artist from '../Artist';
import { shuffleArray } from '../tools/Utils';

const Home: React.FC = () => {
    const { musics } = React.useContext(MusicsContext)
    const { isLoading } = React.useContext(LoadingContext)
    const { track } = React.useContext(TrackContext)

    const swiperRef = React.useRef<SwiperType>()

    const albums = React.useMemo(() => {
        let albumsWithPicture: any[] = []
        Object.values(musics.albums).forEach(el => { if (el.songs[0].metadatas.common.picture) return albumsWithPicture = [...albumsWithPicture, el] })
        return shuffleArray(albumsWithPicture).slice(0, 20)
    }, [musics])
    const artists = React.useMemo(() => { return shuffleArray(Object.entries(musics.artists)).slice(0, 20) }, [musics])
    const songs = React.useMemo(() => { return shuffleArray(musics.all).slice(0, 20) }, [musics])

    const [album, setAlbum] = React.useState<IAlbum.Props>({ active: false, ...albums[0] })
    const [artist, setArtist] = React.useState<IArtist.Props>({ active: false, ...artists[0] })

    const { common } = track.song.metadatas

    return (
        <HomeContainer>
            <div className='currently__playing'>
                <div className='currently__playing-before'>
                    Now
                </div>
                <div className='currently__playing-title'>
                    {track.song.title}
                    <span>{common?.artist ? common.artist : 'Unknown artist'}</span>
                    {common?.artist && common.album &&
                        <span>|</span>
                    }
                    {common?.album &&
                        <span>{common?.album}</span>
                    }
                </div>
            </div>
            <div className='swiper__top'>
                <Link to="/albums">View all</Link>
                <div className="swiper__buttons">
                    <div className="swiper__button previous" onClick={() => swiperRef.current?.slidePrev()}>
                        <Icon name="DoubleArrowLeft" />
                    </div>
                    <div className="swiper__button next" onClick={() => swiperRef.current?.slideNext()}>
                        <Icon name="DoubleArrowRight" />
                    </div>
                </div>
            </div>
            <Swiper
                className='swiper'
                keyboard={{ enabled: true }}
                mousewheel={true}
                modules={[Navigation, Keyboard, Mousewheel]}
                onBeforeInit={swiper => swiperRef.current = swiper}
                slidesPerView="auto"
                spaceBetween={20}
            >
                {!isLoading ? (
                    albums.map((album: IAlbum.Props, key: number) => {
                        const { picture } = album.songs[0].metadatas.common
                        return (
                            <SwiperSlide key={key} className="swiper__slide" tabIndex={key} onClick={() => setAlbum({ ...album, active: true })}>
                                <AlbumCard>
                                    <div className='album__card-image'>
                                        {picture ? <img src={picture} alt={album.title} /> : <Icon name="CD" />}
                                    </div>
                                    <div className='album__card-infos'>
                                        <div className='album__card-title'>
                                            {album.title || 'Albums inconnus'}
                                        </div>
                                        <div className='album__card-artist'>
                                            <span>{album.artist || 'Unknown artist'}</span>
                                            {album.artist && album.year && <span>|</span>}
                                            {album.year && <span>{album.year}</span>}
                                        </div>
                                    </div>
                                </AlbumCard>
                            </SwiperSlide>
                        )
                    })
                ) : (
                    [...Array(15)].map((_, key) => {
                        return (
                            <SwiperSlide key={key} className="swiper__slide">
                                <AlbumCard>
                                    <div className='album__card-image'>
                                        <Icon name="CD" />
                                    </div>
                                    <div className='album__card-infos'>
                                        <div className='loading-skeleton loading-h12-w120 mb-2'></div>
                                        <div className='loading-skeleton loading-h12-w100'></div>
                                    </div>
                                </AlbumCard>
                            </SwiperSlide>
                        )
                    })
                )}
            </Swiper>
            <HomeBottom>
                <SongsContainer>
                    <h3>Recommendations</h3>
                    <div className="list__container-inner">
                        {songs.map((music: { [key: string]: any }, i: number) => {
                            return (
                                track.song._id !== music._id ? (
                                    <Song
                                        key={i}
                                        music={music}
                                        context={{ name: 'all' }}
                                        contextSongs={musics.all}
                                    />
                                ) : (
                                    <SongActive key={i} />
                                )
                            )
                        })}
                    </div>
                </SongsContainer>
                <ArtistsContainer>
                    <h3>Artists</h3>
                    <div className='list__container-inner'>
                        {artists.map((artist: any, j: number) => {
                            const name = artist[0]
                            const songs = artist[1]
                            return (
                                <Artist
                                    key={j}
                                    artist={{ name: name, songs: songs }}
                                    onClick={() => setArtist({ active: true, name: name, songs: songs })}
                                />
                            )
                        })}
                    </div>
                </ArtistsContainer>
            </HomeBottom>
            <AlbumSongs
                album={album}
                setAlbum={setAlbum}
            />
            <ArtistSongs
                artist={artist}
                setArtist={setArtist}
            />
        </HomeContainer>
    )
}

export default Home

const HomeContainer = styled.div`
    position : relative;
    width    : 100%;
    height   : 100%;
    margin   : auto;
    overflow : hidden;
    
    .currently__playing {
        padding : 10px 25px;
        @media(max-width: 992px) {
            padding : 20px 15px 0;
        }
    }

    .currently__playing-before {
        font-weight   : 500;
        color         : var(--primary);
        margin-bottom : 8px;
    }

    .currently__playing-title {
        font-size          : 24px;
        font-weight        : 600;
        text-overflow      : ellipsis;
        overflow           : hidden;
        width              : 100%;
        display            : -webkit-box;
        -webkit-line-clamp : 1;
        -webkit-box-orient : vertical;
        span {
            font-size : 16px;
            color     : var(--text-secondary);
            &:nth-child(1) {
                margin-left : 8px;
            }
            &:nth-child(2) {
                margin : 0 5px;
            }
        }

        @media(max-width: 768px) {
            font-size : 18px;
        }
    }

    .swiper {
        width        : 100%;
        height       : auto;
        padding-left : 25px;
        z-index      : unset;

        @media(max-width: 992px) {
            padding-left : 15px;
        }
    }

    .swiper__slide {
        width : 140px;
    }

    .swiper__top {
        display         : flex;
        width           : 100%;
        justify-content : space-between;
        align-items     : center;
        padding         : 10px 25px;

        @media(max-width: 992px) {
            padding : 15px 15px 8px;
        }

        a {
            font-size        : 16px;
            padding          : 6px 10px 5px;
            color            : var(--primary);
            background-color : rgba(var(--primary-rgb), 0.08);
            border-radius    : var(--rounded-sm);

            &:hover {
                background-color : rgba(var(--primary-rgb), 0.17);
            }
        }
    }

    .swiper__buttons {
        display : flex;

        .swiper__button {
            width         : 34px;
            height        : 34px;
            padding       : 5px;
            color         : var(--primary);
            border-radius : var(--rounded-md);
            cursor        : pointer;

            &:hover {
                color            : var(--primary);
                background-color : rgba(var(--primary-rgb), 0.12);
            }
        }
    }
`

const AlbumCard = styled.div`
    position : relative;
    width    : 140px;
    height   : 190px;
    cursor   : pointer;

    .album__card-image {
        width            : 140px;
        height           : 140px;
        display          : flex;
        align-items      : center;
        justify-content  : center;
        background-color : var(--content-light);
        border-radius    : var(--rounded-md);
        box-shadow       : var(--shadow-tiny);

        img {
            width         : 100%;
            height        : 100%;
            object-fit    : cover;
            border-radius : var(--rounded-md);
        }

        svg {
            width   : 120px;
            height  : 120px;
            opacity : 0.7;
            color   : var(--svg);
        }
    }

    .album__card-infos {
        padding    : 10px 5px 0;
        text-align : center;
    }

    .album__card-title {
        margin-bottom : 5px;
        font-weight   : 600;
    }
    .album__card-artist {
        color : var(--text-secondary);
        span {
            &:nth-child(2) {
                margin : 0 5px;
            }
        }
    }
    .album__card-title,
    .album__card-artist {
        width              : 100%;
        text-overflow      : ellipsis;
        overflow           : hidden;
        display            : -webkit-box;
        -webkit-line-clamp : 1;
        -webkit-box-orient : vertical;
    }
`

const HomeBottom = styled.div`
    position : relative;
    display  : flex;
    padding  : 25px 25px 0;
    height   : calc(100% - 317px);

    @media (max-width: 992px) {
        flex-direction : column;
        padding        : 25px 15px 0;
    }
`

const SongsContainer = styled.div`
    width  : 50%;
    height : 100%;

    @media (max-width: 992px) {
        width : 100%;
    }

    .list__container-inner {
        display               : grid;
        grid-template-columns : 1fr;
        width                 : 100%;
        height                : 100%;
        padding-bottom        : 40px;
        overflow-y            : auto;

        @media (max-width: 992px) {
            padding-bottom : 60px;
        }
    }
`

const ArtistsContainer = styled.div`
    position     : relative;
    width        : 50%;
    height       : 100%;
    padding-left : 30px;
    margin       : auto;
    overflow     : hidden;

    .list__container-inner {
        display               : grid;
        grid-template-columns : 1fr;
        padding-bottom        : 40px;
        height                : 100%;
        overflow-y            : auto;
    }
`