import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import HorizontalList from '../HorizonalList'

function ButtonRow({
	items,
	activeIndex,
	action,
}: {
	items: React.ReactNode[]
	activeIndex: number
	action: (index: number) => any
}) {
	return (
		<Row>
			{items.map((item, index) => {
				return (
					<Button
						key={index}
						noPadding
						kind="secondary"
						action={() => action(index)}
					>
						<Item isActive={activeIndex === index}>{item}</Item>
					</Button>
				)
			})}
		</Row>
	)
}

const Item = styled.div<{ isActive: boolean }>`
	border: 3px ${({ theme }) => theme.gray} solid;
	border-radius: 30px;
	background-color: ${(props) =>
		props.isActive ? props.theme.gray : 'transparent'};
	padding: 7px 20px;
	font-size: 12px;
`

const Row = styled(HorizontalList)`
	gap: 7px;
	margin-bottom: 0px !important;
	margin-top: 0px !important;
`

export default ButtonRow
