import { useContext, useEffect, useState } from 'react'
import { VscLibrary } from 'react-icons/vsc'
import { useNavigate } from 'react-router'
import styled, { ThemeContext } from 'styled-components'
import Button from '../../../components/Button'
import ButtonRow from '../../../components/ButtonRow'
import ColoredCard from '../../../components/ColoredCard/ColoredCard'
import CoverArt from '../../../components/CoverArt'
import HorizontalList from '../../../components/HorizonalList'
import LikedSongs from '../../../components/LikedSongs'
import SectionTitle from '../../../components/SectionTitle'
import { AuthContext } from '../../../contexts'
import getEndpoint from '../../../utils/spotify/getEndpoint'
import arrayToRgba from '../../../utils/ui/arrayToRgba'

function Library() {
	const { id, token, display_name } = useContext(AuthContext).userData
	const { globalBorderRadius } = useContext(ThemeContext)
	const navigate = useNavigate()
	const [playlists, setPlaylists] = useState<object[]>([])
	const [artists, setArtists] = useState<object[]>([])
	const [albums, setAlbums] = useState<object[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [filters, setFilters] = useState<any>({
		playlists: 0,
		artists: 0,
		albums: 0,
	})

	useEffect(() => {
		getPlaylists()
	}, [])

	async function getPlaylists() {
		await getEndpoint(`/users/${id}/playlists`, token).then((r: any) => {
			setPlaylists(r.data.items)
		})
		await getEndpoint(`/me/following?type=artist`, token).then((r: any) => {
			setArtists(r.data.artists.items)
		})
		await getEndpoint(`/me/albums`, token).then((r: any) => {
			setAlbums(r.data.items)
		})
		setIsLoading(false)
	}

	return !isLoading ? (
		<Container>
			<div style={{ marginBottom: 25 }}>
				<SectionTitle>
					<VscLibrary /> Your Library
				</SectionTitle>
			</div>
			<div className="collection-title">
				<h3>Playlists</h3>
				<ButtonRow
					action={(index) =>
						setFilters((s: any) => ({ ...s, playlists: index }))
					}
					activeIndex={filters.playlists}
					items={['All', 'Fun', 'Chill', 'Dance', 'Acoustic']}
				/>
			</div>
			<HorizontalList>
				<LikedSongs />
				{playlists.map((playlist: any, index: number) => {
					return (
						<Button
							action={() => navigate(`/playlist/${playlist.id}`)}
							noPadding
							kind="secondary"
							key={index}
						>
							<ColoredCard
								title={playlist.name}
								description={
									playlist.public ? 'Public playlist' : 'Private playlist'
								}
								images={playlist.images}
							/>
						</Button>
					)
				})}
			</HorizontalList>
			<div className="collection-title">
				<h3>Albums</h3>
			</div>
			<HorizontalList>
				{albums.map((item: any, index: number) => {
					return (
						<Button
							kind="secondary"
							action={() => navigate(`/album/${item.album.id}`)}
							key={index}
							noPadding
						>
							<div className="album-container">
								<CoverArt
									size="big"
									borderRadius={globalBorderRadius}
									imgArray={item.album.images}
								/>
								<p>{item.album.name}</p>
								<p style={{ margin: 0, opacity: 0.6 }}>
									{item.album.artists[0].name}
								</p>
							</div>
						</Button>
					)
				})}
			</HorizontalList>

			<div className="collection-title">
				<h3>Artists</h3>
			</div>
			<HorizontalList>
				{artists.map((artist: any, index: number) => {
					return (
						<Button
							kind="secondary"
							noPadding
							action={() => navigate(`/artist/${artist.id}`)}
							key={index}
						>
							<div>
								<CoverArt borderRadius={120} imgArray={artist.images} />
								<p style={{ marginBottom: 0 }}>{artist.name}</p>
							</div>
						</Button>
					)
				})}
			</HorizontalList>
		</Container>
	) : null
}

const Container = styled.div`
	padding-top: 100px;
	padding-left: 100px;
	padding-bottom: 100px;
	min-width: 100%;
	max-width: 100%;
	overflow: scroll;
	overflow-x: hidden;
	background: ${({ theme }) =>
		`linear-gradient(${theme.background} -20%, ${theme.background} 20%)`};

	.collection-title {
		display: flex;
		align-items: center;
		gap: 30px;
		h3 {
			margin: 0px;
		}
	}
	.album-container {
		height: 250px;
		max-width: 200px;
		overflow: hidden;

		p {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align: left;
			margin: 0px;
			margin-top: 15px;
		}
	}
`

export default Library
