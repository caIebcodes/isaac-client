import { useEffect, useState, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import validateToken from '../../utils/spotify/validateToken'

function Auth() {
	const navigate = useNavigate()
	const [params] = useSearchParams()
	const [isValidated, setIsValidated] = useState<boolean>(false)

	if (!params.get('access_token'))
		window.location.href = 'http://localhost:8080/login'
	const accessToken = String(params.get('access_token'))
	const refreshToken = String(params.get('refresh_token'))
	const genTime = String(params.get('gen_time'))

	useEffect(() => {
		validateToken(accessToken).then((r: boolean) => {
			setIsValidated(r)
			if (r) localStorage.setItem('access_token', accessToken)
			if (r) localStorage.setItem('refresh_token', refreshToken)
			if (r) localStorage.setItem('gen_time', genTime)
			if (r) navigate('/')
		})
	}, [])

	return (
		<div>
			{isValidated ? <p>Signing you in...</p> : <p>Could not sign you in</p>}
		</div>
	)
}

export default Auth
