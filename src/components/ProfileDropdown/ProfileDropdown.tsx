import { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../contexts'

function ProfileDropdown() {
	const { display_name } = useContext(AuthContext).userData
	const { imageUrl } = useContext(AuthContext).userData
	return (
		<Container>
			<ProfileImage src={imageUrl} />
			<p>{display_name}</p>
		</Container>
	)
}

const Container = styled.div`
	border-radius: 35px;
	background-color: ${({ theme }) => theme.background + '80'};
	width: 100%;
	height: 35px;

	padding: 15px;

	display: flex;
	align-items: center;
	justify-content: center;

	gap: 20px;

	box-sizing: border-box;

	user-select: none;
`

const ProfileImage = styled.img`
	width: 20px;
	height: 20px;
	border-radius: 30px;
`
export default ProfileDropdown
