import React, { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { ISpotifyImage } from '../../interfaces/spotify'
import arrayToRgba from '../../utils/ui/arrayToRgba'
import getForegroundColor from '../../utils/ui/getForegroundColor'
import CoverArt from '../CoverArt'

function ColoredCard({
	title,
	description,
	images,
}: {
	title: string
	description: string
	images: ISpotifyImage[]
}) {
	const [backgroundColor, setBackgroundColor] = useState<
		[number, number, number]
	>([0, 0, 0])

	return (
		<Container backgroundColor={backgroundColor}>
			<div style={{ position: 'relative' }}>
				<Overlay backgroundColor={backgroundColor} />
				<CoverArt
					setImageColors={setBackgroundColor}
					imgArray={images}
					size="medium"
				/>
			</div>
			<div className="title">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</Container>
	)
}
const Container = styled.div<{ backgroundColor: [number, number, number] }>`
	display: flex;
	gap: 40px;

	max-height: 140px;
	min-width: 450px;

	overflow: hidden;

	background-color: ${(props) => arrayToRgba(props.backgroundColor)};
	color: ${(props) => getForegroundColor(props.backgroundColor)};
	border-radius: ${({ theme }) => theme.globalBorderRadius}px;

	.title {
		text-align: left;
		h3 {
			margin-bottom: 5px;
		}
		p {
			margin: 0px;
			opacity: 0.6;
		}
	}
`
const Overlay = styled.div<{ backgroundColor: [number, number, number] }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 140px;
	height: 140px;
	background: linear-gradient(
		90deg,
		transparent 80%,
		${(props) => arrayToRgba(props.backgroundColor)} 100%
	);
`

export default ColoredCard
