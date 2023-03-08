import React from 'react'
import { IPlaylist } from './types/types'

type MusicsContextType = {
    musics: {
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
    },
    setMusics: React.Dispatch<React.SetStateAction<{ all: object[], sorted: { [key: string]: any }, artists: { [key: string]: any }, albums: { [key: string]: any } }>>,
    playlists: Array<IPlaylist.Props>,
    setPlaylists: React.Dispatch<React.SetStateAction<Array<IPlaylist.Props>>>
}

const IMusicsContextTypeState = {
    musics: {
        all: [],
        sorted: {},
        artists: {},
        albums: {}
    },
    setMusics: () => { },
    playlists: [],
    setPlaylists: () => { }
}

export const MusicsContext = React.createContext<MusicsContextType>(IMusicsContextTypeState)

/**
 * 
 */

type LoadingContextType = {
    isLoading: boolean | null,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ILoadingContextTypeState = {
    isLoading: true,
    setLoading: () => { }
}

export const LoadingContext = React.createContext<LoadingContextType>(ILoadingContextTypeState)

/**
 * 
 */

type TrackContextType = {
    track: {
        isPlaying: boolean,
        song: {
            _id?: string,
            url?: string,
            title?: string,
            artist?: string,
            currentTime?: number
            remainingTime?: number,
            metadatas?: any
        },
        context: any
    },
    setTrack: React.Dispatch<React.SetStateAction<{ isPlaying: boolean, song: {
        _id?: string,
        url?: string,
        title?: string,
        artist?: string,
        currentTime?: number
        remainingTime?: number,
        metadatas?: any
    }, context: object }>>
}

const ITrackContextTypeState = {
    track: {
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
        context: {}
    },
    setTrack: () => { }
}

export const TrackContext = React.createContext<TrackContextType>(ITrackContextTypeState)

/**
 * 
 */

type PlayerPropsContextType = {
    playerProps: {
        open: boolean,
        mode: string
    },
    setPlayerProps: React.Dispatch<React.SetStateAction<{ open: boolean, mode: string }>>
}

const IPlayerPropsContextTypeState = {
    playerProps: {
        open: false,
        mode: 'shuffle'
    },
    setPlayerProps: () => { }
}

export const PlayerPropsContext = React.createContext<PlayerPropsContextType>(IPlayerPropsContextTypeState)

/**
 * 
 */

type PlayerContextType = {
    player: HTMLMediaElement | null,
    audioContext: AudioContext | undefined,
    source: MediaElementAudioSourceNode | undefined
}

const IPlayerContextTypeState = {
    player: null,
    audioContext: undefined,
    source: undefined
}

export const PlayerContext = React.createContext<PlayerContextType>(IPlayerContextTypeState)