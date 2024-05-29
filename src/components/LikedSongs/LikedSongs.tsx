import { useNavigate } from 'react-router'
import styled, { keyframes } from 'styled-components'
import backgroundMove from '../../style/animations/backgroundMove'
import backgroundStretch from '../../style/animations/backgroundStretch'
import pulse from '../../style/animations/pulse'
import Button from '../Button'

function LikedSongs() {
	const navigate = useNavigate()
	return (
		<Button
			action={() => navigate('/collection/tracks')}
			kind="secondary"
			noPadding
		>
			<Container>
				<svg fill="white" role="img" height={30} width={30} viewBox="0 0 16 16">
					<path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
				</svg>
				Liked Songs
			</Container>
		</Button>
	)
}

const Container = styled.div`
	background: linear-gradient(45deg, red 40%, lightblue 100%);
	background-repeat: no-repeat;
	border-radius: ${({ theme }) => theme.globalBorderRadius}px;
	min-width: 170px;
	min-height: 140px;
	max-height: 140px;

	display: flex;
	gap: 10px;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	svg {
		animation: ${pulse} 1s ease-in-out infinite;
	}

	color: white;
	background-size: 100% 200%;
	animation: ${backgroundMove} 3s ease-in-out infinite alternate-reverse;
`

export default LikedSongs
