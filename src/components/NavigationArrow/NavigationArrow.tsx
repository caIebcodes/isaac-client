import { useEffect, useState } from 'react'
import { RiHome3Line } from 'react-icons/ri'
import {
	IoArrowBackCircle,
	IoArrowForwardCircle,
	IoSearch,
} from 'react-icons/io5'
import { VscLibrary } from 'react-icons/vsc'
import { useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import Button from '../Button'

function NavigationArrow() {
	const navigate = useNavigate()
	const [isHome, setIsHome] = useState<boolean>(false)
	const [isLibrary, setIsLibrary] = useState<boolean>(false)
	const [isSearch, setIsSearch] = useState<boolean>(false)
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === '/') setIsHome(true)
		else setIsHome(false)
		if (location.pathname.includes('/collection')) setIsLibrary(true)
		else setIsLibrary(false)
		if (location.pathname.includes('/search')) setIsSearch(true)
		else setIsSearch(false)
	}, [location])

	return (
		<Container>
			<div className="controls">
				<Button action={() => navigate(-1)} noPadding kind="secondary">
					<IoArrowBackCircle opacity={0.4} fontSize={30} />
				</Button>

				<Button
					action={() => navigate('/', { replace: true })}
					kind="secondary"
				>
					<p style={{ opacity: isHome ? 1 : 0.4 }}>
						<RiHome3Line fontSize={25} /> Home
					</p>
				</Button>
				<Button
					action={() => navigate('/collection', { replace: true })}
					kind="secondary"
				>
					<p style={{ opacity: isLibrary ? 1 : 0.4 }}>
						<VscLibrary fontSize={25} /> Library
					</p>
				</Button>
				<Button action={() => navigate(1)} noPadding kind="secondary">
					<IoArrowForwardCircle opacity={0.4} fontSize={30} />
				</Button>
			</div>
		</Container>
	)
}

const Container = styled.div`
	pointer-events: none;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	p {
		display: flex;
		align-items: center;
		gap: 5px;
		margin: 5px;
	}

	.controls {
		position: absolute;
		top: 0px;
		left: 0px;
		margin-top: 20px;
		margin-left: 50px;
		padding: 5px 15px;
		display: flex;
		align-items: center;
		gap: 20px;
		pointer-events: all;
		button {
			padding: 5px 5px;
		}
		backdrop-filter: blur(20px);
		background-color: #00000080;
		border-radius: 40px;
		overflow: hidden;
	}
`

export default NavigationArrow
