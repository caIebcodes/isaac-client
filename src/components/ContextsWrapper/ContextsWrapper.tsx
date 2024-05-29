import React, { useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { AuthContext, PlayerContext } from '../../contexts'
import { IAuthContext, IPlayerState } from '../../interfaces/context'
import themes from '../../themes'

function ContextsWrapper({ children }: { children: React.ReactNode }) {
	const [userData, setUserData] = useState<IAuthContext>({} as IAuthContext)
	const [playerState, setPlayerState] = useState<IPlayerState>({
		currentTime: '0:00',
		position: 1, // in milliseconds
		duration: 1, // in milliseconds
		volume: 0.5, // range 0 to 1
		isPaused: true,
	})
	const [currentTheme, setCurrentTheme] = useState<any>({
		...themes[0],
		currentAdaptiveColor: [0, 0, 0],
	})

	return (
		<Container>
			<ThemeContext.Provider value={{ ...currentTheme, setCurrentTheme }}>
				<AuthContext.Provider value={{ ...userData, setUserData }}>
					<PlayerContext.Provider value={{ playerState, setPlayerState }}>
						{children}
					</PlayerContext.Provider>
				</AuthContext.Provider>
			</ThemeContext.Provider>
		</Container>
	)
}

const Container = styled.div`
	min-width: 100vw;
	min-height: 100vh;
	background-color: ${themes[0].background};
	color: ${themes[0].foreground};

	div::-webkit-scrollbar {
		display: none;
	}
`

export default ContextsWrapper
