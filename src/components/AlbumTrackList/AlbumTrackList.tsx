import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../../contexts'
import { ISpotifyArtist, ISpotifyTrack } from '../../interfaces/spotify'
import popUp from '../../style/animations/popUp'
import positionToMinutes from '../../utils/player/positionToMinutes'
import deleteEndpoint from '../../utils/spotify/deleteEndpoint'
import getEndpoint from '../../utils/spotify/getEndpoint'
import putEndpoint from '../../utils/spotify/putEndpoint'
import Button from '../Button'
import CoverArt from '../CoverArt'
import LikeButton from '../LikeButton'
import SectionTitle from '../SectionTitle'
import Track from '../Track'

function AlbumTrackList({
	title,
	year,
	uri,
	tracks,
	artist,
	similar,
	kind,
}: {
	title: string
	year?: number
	uri: string
	tracks: ISpotifyTrack[]
	artist: ISpotifyArtist
	similar?: any
	kind: string
}) {
	const { token } = useContext(AuthContext).userData

	let duration = 0
	tracks.forEach((track: any) => (duration += track.duration_ms))
	const [selectedIndex, setSelectedIndex] = useState<number>(-1)
	const [isLiked, setIsLiked] = useState<boolean>(false)
	const [isGatheringData, setIsGatheringData] = useState<boolean>(true)
	const listRef = useRef<HTMLDivElement | null>(null)

	const navigate = useNavigate()

	useEffect(() => {
		checkLiked()
		if (listRef.current) listRef.current.scrollTop = 0
	}, [uri])

	function checkLiked() {
		getEndpoint(
			`/me/albums/contains?ids=${uri.replace('spotify:album:', '')}`,
			token
		).then((r: any) => {
			setIsGatheringData(false)
			setIsLiked(r.data[0])
		})
	}
	function toggleLiked() {
		isLiked
			? deleteEndpoint(
					`/me/albums?ids=${uri.replace('spotify:album:', '')}`,
					token
			  ).then(() => setIsLiked(false))
			: putEndpoint(
					`/me/albums?ids=${uri.replace('spotify:album:', '')}`,
					token
			  ).then(() => setIsLiked(true))
	}

	return (
		<Container ref={listRef}>
			<TrackListInfo>
				<div className="title">
					<div>
						<p style={{ margin: 0 }}>{kind}</p>
						<SectionTitle hideSeparator>{title}</SectionTitle>
						<div className="extra">
							{year || ''} • {tracks.length}{' '}
							{tracks.length > 1 ? 'songs' : 'song'},{' '}
							{positionToMinutes(duration).slice(
								0,
								positionToMinutes(duration).indexOf(':')
							) + ' min'}{' '}
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<img src={artist.images[2]?.url || ''} />
								<b>{artist.name}</b>
							</div>
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
							track={track}
							index={index}
							onClick={() => setSelectedIndex(index)}
							isSelected={index === selectedIndex ? true : false}
							key={track.uri}
							artists={track.artists}
						/>
					)
				})}
			</div>
			{similar?.length > 0 && !isGatheringData ? (
				<>
					<h2>You might also like</h2>
					<div className="similar">
						{similar.slice(0, 6).map((album: any, index: number) => {
							return (
								<Button
									action={() => navigate(`/album/${album.id}`)}
									key={index}
									noPadding={true}
									kind="secondary"
								>
									<div>
										<CoverArt size="medium" imgArray={album.images} />
										<p>{album.name}</p>
									</div>
								</Button>
							)
						})}
					</div>
				</>
			) : null}
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
		display: flex;
		align-items: center;
		gap: 20px;
		margin-top: 5px;

		p {
			margin: 0px;
			opacity: 0.6;
		}
		img {
			height: 20px;
			width: 20px;
			border-radius: 20px;
			margin-right: 15px;
		}
	}
	.similar {
		display: flex;
		gap: 15px;
		overflow: scroll;

		align-items: flex-start;

		text-align: center;
		button {
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

export default AlbumTrackList
