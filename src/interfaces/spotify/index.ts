export interface ISpotifyImage {
	height: number
	width: number
	size: string
	url: string
}
export interface ISpotifyTrack {
	album: {
		images: ISpotifyImage[]
		name: string
		uri: string
	}
	artists: ISpotifyArtist[]
	name: string
	track_type: string
	duration_ms: number
	id: string
	is_playable: boolean
	uid: string
	uri: string
}
export interface ISpotifyArtist {
	name: string
	images: ISpotifyImage[]
	uri: string
	url: string
}
