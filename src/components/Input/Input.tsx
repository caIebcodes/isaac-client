import React from 'react'
import styled from 'styled-components'
interface IInput {
	kind?: 'normal' | 'textarea'
	onChange: (e: React.ChangeEvent) => any
	value?: string
}
function Input({ kind = 'normal', onChange, value }: IInput) {
	if (kind === 'normal')
		return (
			<InputContainer
				value={value}
				onChange={(e) => onChange(e)}
			></InputContainer>
		)
	return (
		<TextAreaContainer
			value={value}
			maxLength={300}
			onChange={(e) => onChange(e)}
		></TextAreaContainer>
	)
}

const InputContainer = styled.input`
	padding: 5px;
	box-sizing: border-box;
	width: 300px;

	border: none;

	background-color: ${({ theme }) => theme.gray};
	color: ${({ theme }) => theme.foreground};
	border-radius: ${({ theme }) => theme.globalBorderRadius / 2}px;

	font-family: ${({ theme }) => theme.fontFamily};
	font-size: 16px;

	&:focus {
		outline: 2px solid ${({ theme }) => theme.foreground + '4c'};
	}
`
const TextAreaContainer = styled.textarea`
	padding: 5px;
	box-sizing: border-box;

	width: 100%;
	height: 100px;

	border: none;

	background-color: ${({ theme }) => theme.gray};
	color: ${({ theme }) => theme.foreground};
	border-radius: ${({ theme }) => theme.globalBorderRadius / 2}px;

	font-family: ${({ theme }) => theme.fontFamily};
	font-size: 16px;

	&:focus {
		outline: 2px solid ${({ theme }) => theme.foreground + '4c'};
	}
	resize: none;
`

export default Input
