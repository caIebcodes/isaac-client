import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext, PlayerContext } from '../../contexts'

export default function usePlayer(onConnect?: () => any): any {
	const { token } = useContext(AuthContext).userData
	const [player, setPlayer] = useState<Spotify.Player | null>(null)
	const { setPlayerState } = useContext(PlayerContext)

	const [state, setState] = useState<'ready' | 'not ready'>('not ready')

	useEffect(() => {
		if (!player) connect()
		setState('ready')
	}, [])

	function connect() {
		if (onConnect) onConnect()
		const player = new Spotify.Player({
			name: 'Isaac for Spotify',
			getOAuthToken: (cb) => {
				cb(token)
			},
			volume: 1,
		})
		setPlayer(player)
		player.on('ready', ({ device_id }) => {
			setPlayerState((s: any) => ({ ...s, device_id }))
		})
		player.connect()
	}

	function togglePlay() {
		player?.togglePlay()
	}

	function changeVolume(volume: number) {
		player?.setVolume(volume)
	}

	function next() {
		player?.nextTrack()
	}

	function prev() {
		player?.previousTrack()
	}

	async function getVolume() {
		let vol = 0
		await player?.getVolume().then((r) => (vol = r))
		return vol
	}

	async function getPosition(): Promise<number> {
		let pos = 0
		await player
			?.getCurrentState()
			.then((r) => (pos += r?.position || 0))
			.catch((e) => console.log(e))
		return pos
	}

	function seek(ms: number) {
		player?.seek(ms)
	}

	async function getCurrentTrack() {
		let track
		await player
			?.getCurrentState()
			.then((r) => (track = r?.track_window.current_track))
		return track
	}

	const addStateListener = (event: Spotify.ErrorTypes, callback: () => any) =>
		player?.addListener(event, callback)

	return {
		connect,
		state,
		togglePlay,
		changeVolume,
		getVolume,
		getCurrentTrack,
		next,
		prev,
		getPosition,
		addStateListener,
		seek,
	}
}
