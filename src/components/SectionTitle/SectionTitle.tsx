import React from 'react'
import styled from 'styled-components'

function SectionTitle({
	children,
	hideSeparator = false,
}: {
	children: React.ReactNode
	hideSeparator?: boolean
}) {
	return (
		<Text>
			<div className="children">{children}</div>
			{!hideSeparator ? <div className="separator" /> : null}
		</Text>
	)
}

const Text = styled.h1`
	display: flex;
	flex-direction: column;
	.children {
		font-size: 34px;
		color: ${({ theme }) => theme.foreground};
		margin: 0px;
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.separator {
		width: 10%;
		height: 3px;
		background-color: ${({ theme }) => theme.gray};
		border-radius: 3px;
		margin-top: 15px;
		margin-bottom: 15px;
	}
`

export default SectionTitle
