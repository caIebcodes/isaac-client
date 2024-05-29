import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

function Menu({
	items,
	posX,
	posY,
}: {
	items: React.ReactNode[]
	posX: number
	posY: number
}) {
	return (
		<Container posX={posX} posY={posY}>
			{items}
		</Container>
	)
}

const Container = styled.div<{ posX: number; posY: number }>`
	padding: 10px;
	background-color: ${({ theme }) => theme.gray + '80'};
	backdrop-filter: blur(5px);
	border-radius: ${({ theme }) => theme.globalBorderRadius}px;
	position: absolute;
	top: ${(props) => props.posY}px;
	left: ${(props) => props.posX}px;
`

export default Menu
