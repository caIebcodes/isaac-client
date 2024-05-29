import React from 'react'
import styled from 'styled-components'

function ToggleButton({
	children,
	isActive,
	setActiveIndex,
}: {
	children: React.ReactNode
	isActive: boolean
	setActiveIndex: () => any
}) {
	return <Container isActive={isActive}>{children}</Container>
}

const Container = styled.button<{ isActive: boolean }>`
	border-style: none;

	background-color: ${(props) =>
		props.isActive ? props.theme.gray : props.theme.background};
	color: ${({ theme }) => theme.foreground};
	padding: '10px 30px';
	border-radius: ${({ theme }) => theme.globalBorderRadius}px;

	font-family: ${({ theme }) => theme.fontFamily};

	display: flex;
	align-items: center;
	justify-content: center;

	gap: 10px;

	&:hover {
		cursor: pointer;
	}
	&:active {
		transform: scale(0.97);
		opacity: 0.8;
	}
	transition: all 0.025s ease-in-out;
`

export default ToggleButton
