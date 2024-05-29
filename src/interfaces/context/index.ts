import { Dispatch, SetStateAction } from 'react'
import { ISpotifyTrack } from '../spotify'

export interface IAuthContext {
	userData: {
		id: string
		display_name: string
		token: string
		imageUrl: string
	}
	setUserData: Dispatch<SetStateAction<any>>
}

export interface IPlayerState {
	currentTime: string
	position: number // in milliseconds
	duration: number // in milliseconds
	volume: number // range 0 to 1
	isPaused: boolean
	currentTrack?: ISpotifyTrack
	nextTracks?: ISpotifyTrack[]
	device_id?: string
}

export interface IPlayerContext {
	playerState: IPlayerState
	setPlayerState: Dispatch<SetStateAction<any>>
}
