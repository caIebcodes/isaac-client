import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AuthContext, PlayerContext } from '../../contexts'
import { ISpotifyImage } from '../../interfaces/spotify'
import CoverArt from '../CoverArt'
import LikeButton from '../LikeButton'
import ProfileDropdown from '../ProfileDropdown'
import SidebarQueue from '../SidebarQueue/SidebarQueue'
import toggleSaveSong from '../../utils/spotify/toggleSaveSong'
import getEndpoint from '../../utils/spotify/getEndpoint'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
	const { playerState } = useContext(PlayerContext)
	const { token } = useContext(AuthContext).userData
	const navigate = useNavigate()
	const [isLiked, setIsLiked] = useState<boolean>(false)

	useEffect(() => {
		getEndpoint(
			`/me/tracks/contains?ids=${playerState?.currentTrack?.id}`,
			token
		).then((r: any) => setIsLiked(r.data[0]))
	}, [playerState?.currentTrack])

	return (
		<Container>
			<InfoContainer>
				<ProfileDropdown />
				<div className="title-container">
					<h2
						onClick={() =>
							navigate(
								`/album/${playerState?.currentTrack?.album?.uri.replace(
									'spotify:album:',
									''
								)}`
							)
						}
					>
						{playerState?.currentTrack?.name}
					</h2>
					{playerState?.currentTrack ? (
						<LikeButton
							action={() =>
								toggleSaveSong(
									playerState?.currentTrack?.uri || '',
									token
								).then(() => setIsLiked(!isLiked))
							}
							isLiked={isLiked}
						/>
					) : null}
				</div>
				<p className="artists">
					{playerState?.currentTrack?.artists.map((artist, index) => {
						return (
							<span key={artist.uri}>
								{artist.name}
								{index + 1 === playerState?.currentTrack?.artists.length
									? ''
									: ','}{' '}
							</span>
						)
					})}
				</p>

				<SidebarQueue />
			</InfoContainer>
			<SidebarCover
				size="medium"
				imgArray={
					playerState?.currentTrack?.album.images || ([{}] as ISpotifyImage[])
				}
			/>
		</Container>
	)
}

const Container = styled.div`
	width: 20vw;
	min-height: 100%;
	max-height: 100%;
	background-color: ${({ theme }) => theme.gray + '80'};
	backdrop-filter: blur(30px);

	display: flex;
	flex-direction: column;

	justify-content: space-between;

	box-sizing: border-box;

	user-select: none;
`
const InfoContainer = styled.div`
	padding: 20px 20px;
	box-sizing: border-box;
	h2 {
		font-weight: 500;
		margin: 0px;
	}
	.artists {
		margin: 0px;
		opacity: 0.6;
	}
	.title-container {
		display: flex;
		align-items: center;
		gap: 15px;
		margin-top: 20px;
		h2 {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			&:hover {
				cursor: pointer;
				text-decoration: underline solid;
			}
		}
	}
`
const SidebarCover = styled(CoverArt)`
	min-width: 100%;
	height: auto;
`

export default Sidebar
