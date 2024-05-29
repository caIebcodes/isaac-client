import {
	Dispatch,
	SetStateAction,
	useContext,
	useLayoutEffect,
	useRef,
} from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ISpotifyImage } from '../../interfaces/spotify'

interface ICoverArt {
	imgArray: ISpotifyImage[]
	size?: 'tiny' | 'small' | 'medium' | 'big' | 'large'
	className?: string
	setImageColors?: Dispatch<SetStateAction<[number, number, number]>> | null
	changesAdaptive?: boolean
	borderRadius?: number
}

function CoverArt({
	imgArray,
	size = 'medium',
	className,
	changesAdaptive = false,
	setImageColors,
	borderRadius = 0,
}: ICoverArt) {
	const { setCurrentTheme } = useContext(ThemeContext)
	const imgRef = useRef<HTMLImageElement | null>(null)
	let dimensions = 0
	let finalImgUrl = ''
	let fallBackUrl = '../assets/fallback/cover.webp'

	if (imgArray) {
		switch (size) {
			case 'tiny':
				dimensions = 35
				finalImgUrl =
					imgArray[2]?.url ||
					imgArray[1]?.url ||
					imgArray[0]?.url ||
					fallBackUrl
				break
			case 'small':
				dimensions = 60
				finalImgUrl =
					imgArray[2]?.url ||
					imgArray[1]?.url ||
					imgArray[0]?.url ||
					fallBackUrl
				break
			case 'medium':
				dimensions = 140
				finalImgUrl =
					imgArray[0]?.url ||
					imgArray[2]?.url ||
					imgArray[1]?.url ||
					fallBackUrl
				break
			case 'big':
				dimensions = 200
				finalImgUrl =
					imgArray[1]?.url ||
					imgArray[2]?.url ||
					imgArray[0]?.url ||
					fallBackUrl
				break
			case 'large':
				dimensions = 310
				finalImgUrl =
					imgArray[1]?.url ||
					imgArray[2]?.url ||
					imgArray[0]?.url ||
					fallBackUrl
				break
		}
	}

	useLayoutEffect(() => {
		imgRef.current?.addEventListener('load', () => {
			//@ts-ignore
			const color = window.colorThief.getColor(imgRef.current)
			if (changesAdaptive)
				setCurrentTheme((s: any) => ({
					...s,
					currentAdaptiveColor: color,
				}))
			if (setImageColors) setImageColors(color)
		})
	}, [])

	return (
		<Image
			crossOrigin="anonymous"
			ref={imgRef}
			className={className}
			dimensions={dimensions}
			src={finalImgUrl}
			borderRadius={borderRadius}
		/>
	)
}

const Image = styled.img<{ dimensions: number; borderRadius: number }>`
	width: ${(props) => props.dimensions}px;
	height: ${(props) => props.dimensions}px;
	aspect-ratio: 1/1;
	object-fit: cover;
	user-select: none;
	border-radius: ${(props) => props.borderRadius}px;

	box-shadow: 0px 20px 40px -30px ${(props) => (props.dimensions === 310 ? `rgba(${props.theme.currentAdaptiveColor.join(', ')}, 1)` : 'transparent')};
`

export default CoverArt
