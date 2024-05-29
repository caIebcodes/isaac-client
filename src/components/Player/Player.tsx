import { useContext, useEffect } from 'react'
import { AuthContext, PlayerContext } from '../../contexts'
import usePlayer from '../../player/hook/usePlayer'
import positionToMinutes from '../../utils/player/positionToMinutes'
import PlayButton from '../PlayButton/PlayButton'

import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io'
import { BiVolume } from 'react-icons/bi'
import { FiRepeat, FiShuffle } from 'react-icons/fi'
import { BsArrowsFullscreen } from 'react-icons/bs'
import styled from 'styled-components'
import arrayToRgba from '../../utils/ui/arrayToRgba'

function Player() {
	const { playerState, setPlayerState } = useContext(PlayerContext)

	const { token } = useContext(AuthContext).userData
	const player = usePlayer()

	player.addStateListener('player_state_changed', (state: any) => {
		setPlayerState((s: any) => ({
			...s,
			currentTime: positionToMinutes(state?.position || 0),
			position: state?.position || 1,
			duration: state?.duration || 1,
			isPaused: state?.paused,
			currentTrack: state?.track_window.current_track,
			nextTracks: state
				? [
						{ ...state.track_window.current_track },
						...state.track_window.next_tracks,
				  ]
				: null,
		}))
	})

	useEffect(() => {
		setPlayerState((s: any) => ({
			...s,
			currentTime: positionToMinutes(playerState.position),
		}))
		player
			.getVolume()
			.then((v: number) => setPlayerState((s: any) => ({ ...s, volume: v })))
		const timer = setInterval(() => {
			player.getPosition().then((p: number) => {
				setPlayerState((s: any) => ({ ...s, position: p }))
			})
		}, 500)
		return () => clearInterval(timer)
	}, [playerState.position])

	return (
		<PlayerContainer>
			<Controls>
				{positionToMinutes(playerState.position)}
				<Slider
					type="range"
					min="0"
					max="100"
					value={(playerState.position / playerState.duration) * 100}
					onChange={(e) => {
						player.seek((parseInt(e.target.value) / 100) * playerState.duration)
						setPlayerState({
							...playerState,
							position: (parseInt(e.target.value) / 100) * playerState.duration,
						})
					}}
				/>
				{positionToMinutes(playerState.duration)}
			</Controls>

			<Controls>
				<FiRepeat fontSize={14} />
				<IoMdSkipBackward fontSize={20} onClick={player.prev} />

				<PlayButton
					isPaused={playerState.isPaused}
					action={player.togglePlay}
					kind="primary"
				/>

				<IoMdSkipForward fontSize={20} onClick={player.next} />
				<FiShuffle fontSize={14} />
			</Controls>

			<Controls>
				<BiVolume fontSize={18} />
				<VolumeSlider
					type="range"
					min="0"
					max="100"
					value={playerState.volume * 100}
					onChange={(e) => {
						player.changeVolume(parseInt(e.target.value) / 100)
						setPlayerState({
							...playerState,
							volume: parseInt(e.target.value) / 100,
						})
					}}
				/>
				<BsArrowsFullscreen />
			</Controls>
		</PlayerContainer>
	)
}

const PlayerContainer = styled.div`
	width: 95%;
	height: 30px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	position: absolute;
	bottom: 20px;
	background-color: ${({ theme }) => theme.background + 'cc'};
	backdrop-filter: blur(20px);
	padding: 30px;
	border-radius: 30px;
	box-sizing: border-box;
`

const Controls = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	gap: 15px;
	svg {
		&:hover {
			filter: drop-shadow(0px 0px 5px ${({ theme }) => theme.accent + 'f2'});
		}
	}

	font-family: 'Azeret Mono';
	user-select: none;
`

const Slider = styled.input`
	//thanks to Noah Blon on CodePen for this slider workaround! https://codepen.io/noahblon/pen/OyajvN
	margin: auto;
	-webkit-appearance: none;
	position: relative;
	overflow: hidden;
	height: 5px;
	width: 200px;
	border-radius: 0;

	&::-webkit-slider-runnable-track {
		background: ${({ theme }) => theme.gray};
		&:hover {
			height: 7px;
		}
	}
	::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 0;
		height: 5px;
		box-shadow: -200px 0 0 200px ${({ theme }) => theme.foreground};
		&:hover {
			height: 7px;
			box-shadow: -200px 0 0 200px ${({ theme }) => theme.accent};
		}
	}
	&:hover {
		height: 7px;
	}
	border-radius: 10px;
`

const VolumeSlider = styled(Slider)`
	width: 100px;
`

export default Player
