export { };

declare global {
    interface Window {
        load: any;
    }
}

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