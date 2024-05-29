import React from 'react'
import styled, { keyframes } from 'styled-components'
import backgroundStretch from '../../style/animations/backgroundStretch'
import arrayToRgba from '../../utils/ui/arrayToRgba'

function AdaptiveContainer({ children }: { children: React.ReactNode }) {
	return <Container>{children}</Container>
}

const Container = styled.div`
	width: 100vw;
	padding-right: 25vw;
	box-sizing: border-box;
	height: 100%;

	background: ${({ theme }) =>
		theme.adaptive
			? `linear-gradient(${theme.gradientAngle}, ${arrayToRgba(
					theme.currentAdaptiveColor
			  )} 0%, ${theme.background} 40%)`
			: theme.background};

	background-size: 100% 100%;
	background-repeat: no-repeat;

	position: absolute;

	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	gap: 80px;

	.buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}

	animation: ${backgroundStretch} 1s;
`

export default AdaptiveContainer
