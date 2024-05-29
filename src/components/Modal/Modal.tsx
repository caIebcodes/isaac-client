import { IoClose, IoCloseCircle } from 'react-icons/io5'
import styled, { keyframes } from 'styled-components'

function Modal({
	title,
	canClose = true,
	children,
	onClose,
}: {
	title: string
	canClose?: boolean
	children: React.ReactNode
	onClose?: () => any
}) {
	return (
		<Container onClick={onClose}>
			<Contents onClick={(e) => e.stopPropagation()}>
				<Title>
					<h2>{title}</h2>
					{canClose ? <IoCloseCircle onClick={onClose} fontSize={40} /> : null}
				</Title>
				{children}
			</Contents>
		</Container>
	)
}

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;

	top: 0;
	left: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(20px);
	z-index: 1;
`
const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	h2 {
		margin: 0px;
		margin-bottom: 15px;
	}
`
const popUpAnimation = keyframes`
  from {
    transform: translateY(500px);
  }
  to {
    transform: translateY(0px);
  }
`

const Contents = styled.div`
	background-color: ${({ theme }) => theme.background};
	border-radius: ${({ theme }) => theme.globalBorderRadius}px;
	padding: 40px;

	height: fit-content;
	width: fit-content;

	animation: ${popUpAnimation} 0.5s cubic-bezier(0, 0.76, 0.05, 1.01);
`

export default Modal
