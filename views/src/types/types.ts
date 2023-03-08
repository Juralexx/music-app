export { };

declare global {
    interface Window {
        load: any;
    }
}

/**
 * 
 */

export namespace Musics {
    export interface Props {
        all: object[],
        sorted: {
            [key: string]: any
        },
        artists: {
            [key: string]: any
        },
        albums: {
            [key: string]: any
        }
    }

    export const defaultProps = {
        all: [],
        sorted: {},
        artists: {},
        albums: {}
    }
}

/**
 * 
 */

export namespace Song {
    export interface Props {
        _id: string,
        url: string,
        title: string,
        metadatas: {
            common: {
                [key: string]: any
            }
            format: {
                [key: string]: any
            }
        }
    }
}

/**
 * 
 */

export namespace CurrentSong {
    export interface Props {
        isPlaying: boolean,
        song: {
            _id?: string,
            url?: string,
            title?: string,
            artist?: string,
            currentTime?: number
            remainingTime?: number,
            metadatas?: any,
        },
        context: {
            name?: string,
            songs?: any[]
        }
    }

    export const defaultProps = {
        isPlaying: false,
        song: {
            _id: String(),
            url: String(),
            title: String(),
            artist: String(),
            currentTime: Number(),
            remainingTime: Number(),
            metadatas: {}
        },
        context: {
            name: String(),
            songs: []
        }
    }
}

/**
 * 
 */

export namespace AudioPlayer {
    export interface Props {
        open: boolean,
        mode: string
    }

    export const defaultProps = {
        open: false,
        mode: 'shuffle'
    }
}

export namespace IArtist {
    export interface Props {
        active: boolean,
        name: string,
        songs: Array<Song.Props>
    }
}

/**
 * 
 */

export namespace IAlbum {
    export interface Props {
        active: boolean,
        title: string,
        artist: string,
        year: string,
        songs: any[]
    }
}

/**
 * 
 */

export namespace IPlaylist {
    export interface Props {
        active?: boolean,
        undeletable?: boolean,
        _id: string,
        name: string,
        songs: Array<Song.Props>
    }
}

/**
 * 
 */

export namespace SearchProps {
    export interface Props {
        state: boolean,
        query: string,
        type: string,
        results: any,
        songsResults: any,
        albumsResults: any,
        artistsResults: any,
        filteredResults: any,
    }

    export const defaultProps = {
        state: false,
        query: '',
        type: 'all',
        results: [],
        songsResults: [],
        albumsResults: [],
        artistsResults: [],
        filteredResults: [],
    }
}