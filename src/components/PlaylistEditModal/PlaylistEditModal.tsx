import { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { AuthContext } from '../../contexts'
import { ISpotifyImage } from '../../interfaces/spotify'
import putEndpoint from '../../utils/spotify/putEndpoint'
import Button from '../Button'
import CoverArt from '../CoverArt'
import Input from '../Input'
import Modal from '../Modal'

function PlaylistEditModal({
	id,
	imgArray,
	name,
	description,
	onClose,
	isPublic,
}: {
	id: string
	imgArray: ISpotifyImage[]
	name: string
	description: string
	onClose: () => any
	isPublic: boolean
}) {
	const { background, foreground } = useContext(ThemeContext)
	const { token } = useContext(AuthContext).userData
	const [info, setInfo] = useState<any>({ name, description, isPublic })

	function submitChanges() {
		putEndpoint(`/playlists/${id}`, token, {
			name: info.name,
			description: info.description,
			public: info.isPublic,
		}).then(() => onClose())
	}

	return (
		<Modal onClose={onClose} title="Edit playlist">
			<ContentsContainer>
				<div>
					<CoverArt size="big" imgArray={imgArray} />
					<p>
						By uploading an image, you give Spotify the permission to use it.
						Make sure you own the rights to this image or are allowed to use it
						otherwise.
					</p>
				</div>
				<form style={{ display: 'flex', flexDirection: 'column' }}>
					<label>
						<h3>Playlist name</h3>
						<Input
							onChange={(e: any) =>
								setInfo((s: any) => ({ ...s, name: e.target.value }))
							}
							value={info.name}
						/>
					</label>
					<label>
						<h3>Playlist description</h3>
						<Input
							onChange={(e: any) =>
								setInfo((s: any) => ({ ...s, description: e.target.value }))
							}
							value={info.description}
							kind="textarea"
						/>
					</label>
					<label style={{ display: 'flex', gap: 15 }}>
						<h3>Public</h3>
						<input
							value={info.isPublic}
							onChange={(e: any) =>
								setInfo((s: any) => ({ ...s, isPublic: e.target.value }))
							}
							type="checkbox"
						/>
					</label>
					<Button
						action={(e) => {
							e.preventDefault()
							submitChanges()
						}}
						textColor={background}
						backgroundColor={foreground}
						kind="secondary"
					>
						Submit
					</Button>
				</form>
			</ContentsContainer>
		</Modal>
	)
}

const ContentsContainer = styled.div`
	display: flex;
	gap: 40px;

	input,
	textarea,
	h3 {
		margin-bottom: 15px;
		margin-top: 0px;
	}
	p {
		max-width: 220px;
		font-size: 12px;
	}
`

export default PlaylistEditModal
