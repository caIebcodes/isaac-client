import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../contexts'
import { ISpotifyTrack } from '../../interfaces/spotify'
import popUp from '../../style/animations/popUp'
import positionToMinutes from '../../utils/player/positionToMinutes'
import deleteEndpoint from '../../utils/spotify/deleteEndpoint'
import getEndpoint from '../../utils/spotify/getEndpoint'
import putEndpoint from '../../utils/spotify/putEndpoint'
import LikeButton from '../LikeButton'
import SectionTitle from '../SectionTitle'
import Track from '../Track'

function PlaylistTrackList({
	title,
	uri,
	tracks,
	owner,
	description,
	followers,
	total,
}: {
	title: string
	uri: string
	tracks: ISpotifyTrack[]
	owner: string
	description: string
	followers: number
	total: number
}) {
	const { token } = useContext(AuthContext).userData

	let duration = 0
	tracks.forEach(({ track }: any) => (duration += track.duration_ms || 0))
	const { id } = useContext(AuthContext).userData
	const [minutes, setMinutes] = useState<string>(positionToMinutes(duration))
	const [selectedIndex, setSelectedIndex] = useState<number>(-1)
	const [isLiked, setIsLiked] = useState<boolean>(false)
	const [isGatheringData, setIsGatheringData] = useState<boolean>(true)
	const listRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		checkLiked()
		if (listRef.current) listRef.current.scrollTop = 0
	}, [uri])

	function checkLiked() {
		getEndpoint(
			`/playlists/${uri.replace(
				'spotify:playlist:',
				''
			)}/followers/contains?ids=${id}`,
			token
		).then((r: any) => {
			setIsLiked(r.data[0])
			setIsGatheringData(false)
		})
	}

	function toggleLiked() {
		isLiked
			? deleteEndpoint(
					`/playlists/${uri.replace('spotify:playlist:', '')}/followers`,
					token
			  ).then(() => setIsLiked(false))
			: putEndpoint(
					`/playlists/${uri.replace('spotify:playlist:', '')}/followers`,
					token,
					{ public: false }
			  ).then(() => setIsLiked(true))
	}

	return (
		<Container ref={listRef}>
			<TrackListInfo>
				<div className="title">
					<div>
						<p style={{ margin: 0 }}>Playlist</p>
						<SectionTitle hideSeparator>{title}</SectionTitle>
						<p style={{ margin: 0, marginBottom: 10 }}>{description}</p>
						<div className="extra">
							<p>
								{followers !== undefined ? followers + ' followers • ' : null}
								{total} {total > 1 || total == 0 ? 'songs' : 'song'},{' '}
								{minutes.slice(0, minutes.indexOf(':')) + ' min'} •{' '}
								<b>{owner}</b>
							</p>
						</div>
					</div>
					{!isGatheringData ? (
						<LikeButton action={toggleLiked} size={28} isLiked={isLiked} />
					) : null}
				</div>
			</TrackListInfo>
			<div className="tracks">
				{tracks.map((track: any, index: number) => {
					return (
						<Track
							contextUri={uri}
							track={track.track}
							index={index}
							onClick={() => setSelectedIndex(index)}
							isSelected={index === selectedIndex ? true : false}
							key={track.track.uri}
							artists={track.track.artists}
						/>
					)
				})}
			</div>
		</Container>
	)
}

const Container = styled.div`
	padding-top: 100px;
	padding-bottom: 100px;
	width: 33vw;

	scroll-behavior: smooth;

	user-select: none;

	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}

	.title {
		display: flex;
		gap: 30px;
		align-items: center;
		justify-content: space-between;
		min-width: 100%;
		margin-bottom: 20px;
	}
	.extra {
		p {
			margin: 0px;
			opacity: 0.6;
		}
	}
	.similar {
		display: flex;
		gap: 15px;
		overflow: scroll;

		align-items: flex-start;

		text-align: center;
		a {
			color: ${({ theme }) => theme.foreground};
			text-decoration: none;
		}
		&::-webkit-scrollbar {
			display: none;
		}
	}
	animation: ${popUp} 0.5s;
`

const TrackListInfo = styled.div``

export default PlaylistTrackList
