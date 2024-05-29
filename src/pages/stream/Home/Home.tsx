import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styled, { ThemeContext } from 'styled-components'
import Button from '../../../components/Button'
import ColoredCard from '../../../components/ColoredCard/ColoredCard'
import CoverArt from '../../../components/CoverArt'
import HorizontalList from '../../../components/HorizonalList'
import SectionTitle from '../../../components/SectionTitle'
import { AuthContext } from '../../../contexts'
import getEndpoint from '../../../utils/spotify/getEndpoint'

function Home() {
	const [releases, setReleases] = useState<object[]>([])
	const [featured, setFeatured] = useState<object[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const { token, display_name } = useContext(AuthContext).userData
	const { gray, globalBorderRadius } = useContext(ThemeContext)
	const navigate = useNavigate()

	async function fetchData() {
		await getEndpoint('/browse/new-releases', token).then((r: any) => {
			setReleases(r.data.albums.items.slice(0, 6))
		})
		await getEndpoint('/browse/featured-playlists', token).then((r: any) => {
			setFeatured(r.data.playlists.items.slice(0, 7))
		})
		setIsLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return !isLoading ? (
		<Container>
			<SectionTitle>Welcome back, {display_name}!</SectionTitle>
			<h3>Featured by Spotify</h3>
			<HorizontalList>
				{featured.map((playlist: any) => {
					return (
						<Button
							action={() => navigate(`/playlist/${playlist.id}`)}
							noPadding
							kind="secondary"
							className="featured"
						>
							<CoverArt
								borderRadius={globalBorderRadius}
								size="big"
								imgArray={playlist.images}
							/>
							<div className="text">
								<h3>{playlist.name}</h3>
								<p>{playlist.description}</p>
							</div>
						</Button>
					)
				})}
			</HorizontalList>
			<h3>New releases</h3>
			<HorizontalList>
				{releases.map((album: any) => {
					return (
						<Button
							action={() => navigate(`/album/${album.id}`)}
							noPadding
							kind="secondary"
						>
							<ColoredCard
								title={album.artists[0].name}
								description={album.name}
								images={album.images}
							/>
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

	.featured {
		text-align: left;
		align-items: flex-start;
		font-weight: lighter;
		gap: 20px;
		h3,
		p {
			margin: 0px;
		}
		p {
			opacity: 0.6;
		}
	}

	.buttons {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.search {
			margin-right: 100px;
		}
	}
`

export default Home
