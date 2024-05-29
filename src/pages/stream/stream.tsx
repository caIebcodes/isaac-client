import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { AuthContext } from '../../contexts'

import getUserData from '../../utils/spotify/getUserData'
import Player from '../../components/Player/'
import Sidebar from '../../components/Sidebar'
import styled from 'styled-components'
import axios from 'axios'
import NavigationArrow from '../../components/NavigationArrow'

function Stream() {
	const navigate = useNavigate()
	const { userData, setUserData } = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const token = localStorage.getItem('access_token')
	const refreshToken = localStorage.getItem('refresh_token')
	const date = new Date()
	const genTime = parseInt(String(localStorage.getItem('gen_time')))

	useEffect(() => {
		if (!token) navigate('../auth')
		const time = 3550 - (date.getTime() - genTime) / 1000

		const timer = setInterval(() => {
			console.log('attempting token refresh')
			axios
				.get(`http://localhost:8080/refresh_token?token=${refreshToken}`)
				.then((r: any) => {
					console.log('refreshing token')
					if (r.data.refresh_token)
						localStorage.setItem('refresh_token', r.data.refresh_token)
					localStorage.setItem('access_token', r.data.access_token)
					localStorage.setItem('gen_time', r.data.gen_time)
					setUserData((s: any) => ({ ...s, token: r.data.access_token }))
				})
		}, time * 1000)

		if (!userData)
			getUserData(String(token))
				.then((r) => {
					setUserData(r)
					setIsLoading(false)
				})
				.catch(() => {
					navigate('../auth')
				})

		return () => clearInterval(timer)
	}, [])

	return !isLoading ? (
		<Container>
			<Browser>
				<Outlet />
				<NavigationArrow />
				<Player />
			</Browser>
			<Sidebar />
		</Container>
	) : null
}

const Container = styled.div`
	display: flex;
	min-width: 100vw;
	height: 100vh;
	max-height: 100vh;
`
const Browser = styled.div`
	width: 80vw;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
`

export default Stream
