import React from 'react'
import styled from 'styled-components'

function HorizontalList({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return <Container className={className}>{children}</Container>
}

const Container = styled.div`
	max-width: 100%;
	display: flex;
	gap: 20px;
	overflow: scroll;
	margin-top: 15px;
	margin-bottom: 40px;
	padding-right: 140px;

	.featured {
		display: flex;
		flex-direction: column;
	}
	align-items: flex-start;
`

export default HorizontalList
