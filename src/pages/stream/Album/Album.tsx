import { useContext, useEffect, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import styled from 'styled-components'
import Button from '../../../components/Button'
import CoverArt from '../../../components/CoverArt'
import { AuthContext, PlayerContext } from '../../../contexts'
import getAlbum from '../../../utils/spotify/getAlbum'
import getSimilarAlbums from '../../../utils/spotify/getSimilarAlbums'
import { useParams } from 'react-router'
import playContext from '../../../utils/spotify/playContext'
import AdaptiveContainer from '../../../components/AdaptiveContainer'
import AlbumTrackList from '../../../components/AlbumTrackList'
import { FiShuffle } from 'react-icons/fi'
import getEndpoint from '../../../utils/spotify/getEndpoint'
import { ISpotifyArtist } from '../../../interfaces/spotify'

function Album() {
	const { token } = useContext(AuthContext).userData
	const { playerState } = useContext(PlayerContext)
	const [currentAlbum, setCurrentAlbum] = useState<any>({})
	const [artist, setArtist] = useState<ISpotifyArtist>({} as ISpotifyArtist)
	const [similarAlbums, setSimilarAlbums] = useState<any>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const uri = useParams().uri || ''

	useEffect(() => {
		window.scrollTo(0, 0)
		getAlbum(uri, token).then((album: any) => {
			setCurrentAlbum(album)
			getEndpoint(`/artists/${album.artists[0].id}`, token).then((r: any) => {
				setArtist(r.data)
				setIsLoading(false)
			})
		})
		getSimilarAlbums(uri, token).then((r) => setSimilarAlbums(r))
	}, [uri])

	return !isLoading ? (
		<AdaptiveContainer>
			<AlbumInfo>
				<CoverArt
					imgArray={currentAlbum?.images || []}
					size="large"
					changesAdaptive
				/>
				<div className="buttons">
					<Button
						action={() =>
							playContext(
								currentAlbum?.uri,
								token,
								playerState.device_id || '',
								0
							)
						}
						kind="primary"
					>
						<BsFillPlayFill fontSize={25} /> Play album
					</Button>
					<Button kind="secondary">
						<FiShuffle fontSize={25} /> Shuffle
					</Button>
				</div>
			</AlbumInfo>
			<AlbumTrackList
				kind={currentAlbum?.album_type.replace(
					currentAlbum?.album_type.charAt(0),
					currentAlbum?.album_type.charAt(0).toUpperCase()
				)}
				title={currentAlbum?.name}
				year={currentAlbum?.release_date.slice(0, 4)}
				uri={currentAlbum?.uri}
				tracks={currentAlbum?.tracks.items || []}
				artist={artist}
				similar={similarAlbums}
			/>
		</AdaptiveContainer>
	) : null
}

const AlbumInfo = styled.div`
	height: 100%;
	width: 33%;

	display: flex;
	flex-direction: column;

	align-items: center;
	justify-content: space-around;

	gap: 20px;

	padding-top: 100px;
	padding-bottom: 100px;

	box-sizing: border-box;
`

export default Album
