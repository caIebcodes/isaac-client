import styled from 'styled-components'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'

interface IButtonProps {
	kind: 'primary' | 'secondary'
	isPaused: boolean
	action?: () => any
	className?: string
}

function PlayButton({
	kind = 'secondary',
	action,
	className,
	isPaused = false,
}: IButtonProps) {
	return (
		<Container
			onClick={action}
			className={className}
			kind={kind}
			action={action}
			isPaused={isPaused}
		>
			{isPaused ? (
				<BsFillPlayFill fontSize={25} />
			) : (
				<BsFillPauseFill fontSize={25} />
			)}
		</Container>
	)
}

const Container = styled.button<IButtonProps>`
	border-style: none;
	background-color: ${(props) =>
		props.kind == 'primary' ? props.theme.foreground : 'transparent'};
	color: ${(props) =>
		props.kind == 'primary' ? props.theme.background : props.theme.foreground};
	padding: 5px;
	box-sizing: border-box;
	border-radius: 100%;

	aspect-ratio: 1/1;

	width: 40px;
	height: 40px;

	&:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
	&:active {
		transform: scale(0.95);
		opacity: 0.8;
	}

	transition: all 0.025s ease-in-out;

	display: flex;
	align-items: center;
	justify-content: center;
`

export default PlayButton
