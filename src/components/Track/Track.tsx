import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled, { ThemeContext, useTheme } from 'styled-components'
import { AuthContext, PlayerContext } from '../../contexts'
import { ISpotifyArtist, ISpotifyTrack } from '../../interfaces/spotify'
import popUp from '../../style/animations/popUp'
import positionToMinutes from '../../utils/player/positionToMinutes'
import playContext from '../../utils/spotify/playContext'
import Menu from '../Menu/Menu'

function Track({
	isSelected = false,
	track,
	contextUri,
	index,
	onClick,
	artists,
}: {
	isSelected?: boolean
	contextUri: string
	track: ISpotifyTrack
	index: number
	onClick: () => any
	artists: ISpotifyArtist[]
}) {
	const { token } = useContext(AuthContext).userData
	const { device_id, currentTrack } = useContext(PlayerContext).playerState
	const { accent, foreground } = useContext(ThemeContext)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [showsMenu, setShowsMenu] = useState<boolean>(false)
	const [menuPos, setMenuPos] = useState<any>({
		x: 0,
		y: 0,
	})

	function playTrack() {
		playContext(contextUri, token, device_id || '', index)
	}

	return (
		<Container
			isSelected={isSelected}
			onClick={onClick}
			onDoubleClick={playTrack}
			ref={containerRef}
			index={index}
		>
			{' '}
			<div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
				<p style={{ opacity: 0.4, fontSize: 14 }}>{index + 1}</p>
				<div>
					{currentTrack?.id === track.id ? <PlayingIndicator /> : null}
					<p
						style={{
							color: currentTrack?.id === track.id ? accent : foreground,
						}}
					>
						{track.name}
					</p>
					{artists ? (
						<p style={{ opacity: 0.6, fontSize: 16 }}>
							{artists.map((artist) => artist.name).join(', ')}
						</p>
					) : null}
				</div>
			</div>
			<p style={{ opacity: 0.6 }}>{positionToMinutes(track.duration_ms)}</p>
			{showsMenu ? (
				<Menu posX={menuPos.x} posY={menuPos.y} items={['hi', 'its me']} />
			) : null}
		</Container>
	)
}

const Container = styled.div<{ isSelected: boolean; index: number }>`
	display: flex;
	justify-content: space-between;

	margin-bottom: 15px;

	padding: 10px;
	box-sizing: border-box;

	border-radius: ${({ theme }) => theme.globalBorderRadius}px;
	background-color: ${(props) =>
		props.isSelected ? props.theme.foreground + '0e' : 'transparent'};

	p {
		margin: 0px;
		font-size: 20px;
	}

	&:hover {
		background-color: ${({ theme }) => theme.foreground + '0e'};
	}
	&:active {
		transform: scale(0.99);
		opacity: 0.8;
	}
	transition: all 0.025s ease-in-out;
	animation: ${popUp} 0.5s;
	animation-delay: ${(props) => props.index * 50}ms;
`

const PlayingIndicator = styled.div`
	&::after {
		content: 'PLAYING...';
		width: 5px;
		height: 10px;
		color: ${({ theme }) => theme.foreground};
		background-color: ${({ theme }) => theme.gray};
		border-radius: 5px;
		padding: 1px 5px;
	}
`

export default Track
