import styled from 'styled-components'
import arrayToRgba from '../../utils/ui/arrayToRgba'
import getForegroundColor from '../../utils/ui/getForegroundColor'

interface IButtonProps {
	kind: 'primary' | 'secondary'
	action?: (e: React.MouseEvent) => any
	children?: React.ReactNode
	className?: string
	noPadding?: boolean
	backgroundColor?: string
	textColor?: string
}

function Button({
	kind = 'secondary',
	action,
	children,
	className,
	noPadding = false,
	backgroundColor,
	textColor,
}: IButtonProps) {
	return (
		<Container
			onClick={(e) => {
				if (action) action(e)
			}}
			className={className}
			kind={kind}
			action={action}
			noPadding={noPadding}
			backgroundColor={backgroundColor}
			textColor={textColor}
		>
			{children}
		</Container>
	)
}

const Container = styled.button<IButtonProps>`
	border-style: none;

	background-color: ${(props) =>
		props.kind == 'primary'
			? arrayToRgba(props.theme.currentAdaptiveColor)
			: 'transparent'};
	color: ${(props) =>
		props.kind == 'primary'
			? getForegroundColor(props.theme.currentAdaptiveColor)
			: props.theme.foreground};

	padding: ${(props) => (props.noPadding ? '0px' : '10px 30px')};

	background-color: ${(props) => props.backgroundColor};
	color: ${(props) => props.textColor};

	border-radius: ${({ theme }) => theme.globalBorderRadius}px;

	${(props) =>
		props.kind == 'primary'
			? `box-shadow: 0px 10px 20px -15px ${arrayToRgba(
					props.theme.currentAdaptiveColor
			  )};`
			: null}

	font-family: ${({ theme }) => theme.fontFamily};
	font-weight: bold;

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

export default Button
