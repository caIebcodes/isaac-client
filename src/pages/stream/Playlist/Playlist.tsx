import { useContext, useEffect, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiOutlinePencil } from 'react-icons/hi'
import styled from 'styled-components'
import Button from '../../../components/Button'
import CoverArt from '../../../components/CoverArt'
import { AuthContext, PlayerContext } from '../../../contexts'
import { useParams } from 'react-router'
import playContext from '../../../utils/spotify/playContext'
import AdaptiveContainer from '../../../components/AdaptiveContainer'
import getPlaylist from '../../../utils/spotify/getPlaylist'
import PlaylistTrackList from '../../../components/PlaylistTrackList'
import { FiShuffle } from 'react-icons/fi'
import PlaylistEditModal from '../../../components/PlaylistEditModal/PlaylistEditModal'

function Playlist() {
	const { token, id } = useContext(AuthContext).userData
	const { playerState } = useContext(PlayerContext)
	const [currentPlaylist, setCurrentPlaylist] = useState<any>({})
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const uri = useParams().uri || ''

	async function fetchCurrentPlaylist() {
		window.scrollTo(0, 0)
		await getPlaylist(uri, token).then((playlist) => {
			setCurrentPlaylist(playlist)
		})
		setIsLoading(false)
	}

	useEffect(() => {
		fetchCurrentPlaylist()
	}, [uri, isEditing])

	return !isLoading ? (
		<AdaptiveContainer>
			<AlbumInfo>
				<CoverArt
					imgArray={currentPlaylist.images}
					size="large"
					changesAdaptive
				/>
				<div className="buttons">
					{currentPlaylist?.owner.id === id ? (
						<Button action={() => setIsEditing(true)} kind="secondary">
							<HiOutlinePencil fontSize={20} /> Edit Playlist
						</Button>
					) : null}
					<Button
						action={() =>
							playContext(
								currentPlaylist?.uri,
								token,
								playerState.device_id || '',
								0
							)
						}
						kind="primary"
					>
						<BsFillPlayFill fontSize={25} /> Play playlist
					</Button>
					<Button kind="secondary">
						<FiShuffle fontSize={20} /> Shuffle
					</Button>
				</div>
			</AlbumInfo>
			<PlaylistTrackList
				title={currentPlaylist?.name}
				uri={currentPlaylist?.uri}
				tracks={currentPlaylist?.tracks?.items || []}
				owner={currentPlaylist?.owner.display_name}
				followers={currentPlaylist?.followers.total}
				total={currentPlaylist?.tracks.total}
				description={currentPlaylist?.description}
			/>
			{isEditing ? (
				<PlaylistEditModal
					id={currentPlaylist?.id}
					imgArray={currentPlaylist?.images}
					name={currentPlaylist?.name}
					description={currentPlaylist?.description}
					isPublic={currentPlaylist?.public}
					onClose={() => setIsEditing(false)}
				/>
			) : null}
		</AdaptiveContainer>
	) : null
}

const AlbumInfo = styled.div`
	height: 100%;
	width: 25%;

	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: space-around;

	gap: 20px;

	padding-top: 100px;
	padding-bottom: 100px;

	box-sizing: border-box;
`

export default Playlist
