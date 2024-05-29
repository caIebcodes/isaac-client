import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { PlayerContext } from '../../contexts'
import CoverArt from '../CoverArt'

function SidebarQueue() {
	const nextTracks = useContext(PlayerContext).playerState.nextTracks
	const { accent } = useContext(ThemeContext)

	return nextTracks?.length ? (
		<Container>
			<p style={{ marginBottom: 5 }}>Queue</p>
			<NextTracks>
				{nextTracks.length > 0
					? nextTracks.map((track, index) => {
							return (
								<QueueTrack key={index}>
									<CoverArt size="tiny" imgArray={track.album.images} />
									<div>
										<p style={{ width: '100%' }}>
											{track.name} <br />
											{track.artists[0].name}
											<br />
											{index == 0 ? (
												<b style={{ color: accent, fontSize: 12, margin: 0 }}>
													PLAYING NOW
												</b>
											) : null}
										</p>
										<p style={{ width: '100%', opacity: 0.5 }}></p>
									</div>
								</QueueTrack>
							)
					  })
					: `You've reached the end!`}
			</NextTracks>
		</Container>
	) : null
}

const Container = styled.div`
	margin-top: 20px;

	p {
		margin: 0;
		font-size: 14px;
		text-overflow: ellipsis;
	}
`

const NextTracks = styled.div`
	background-color: ${({ theme }) => theme.foreground + '1a'};
	padding: 20px 25px;
	border-radius: ${({ theme }) => theme.globalBorderRadius}px;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	gap: 20px;

	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`

const QueueTrack = styled.div`
	display: flex;
	flex-direction: row;

	gap: 10px;
`

export default SidebarQueue
