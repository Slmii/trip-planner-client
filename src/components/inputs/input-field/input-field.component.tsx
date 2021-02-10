import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import IconButton from '@components/buttons/icon-button';
import Icon from '@components/icon';
import { InputFieldProps } from '@components/inputs/input-field';
import PasswordMeter from '@components/password-meter';

export default function InputField({
	field,
	name,
	value,
	label = '',
	type = 'text',
	isRequired = false,
	isDisabled = false,
	isReadOnly = false,
	error = '',
	touched = false,
	optional = false,
	autoFocus = false,
	placeholder = '',
	size = 'lg',
	strengthMeter = false,
	passwordStrength = '',
	startAdornment,
	endAdornment,
	onChange,
	onFocus,
	onFocusOut,
	onIconClick,
	onKeyDown
}: InputFieldProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<FormControl id={name} isRequired={isRequired} isInvalid={touched && Boolean(error)}>
			{label && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<InputGroup>
				<Input
					focusBorderColor='primary.500'
					errorBorderColor='red.500'
					_hover={{
						borderColor: 'black'
					}}
					id={name}
					type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
					name={name}
					value={value}
					isDisabled={isDisabled}
					isReadOnly={isReadOnly}
					onFocus={onFocus}
					onBlur={onFocusOut}
					onChange={onChange}
					onKeyDown={onKeyDown}
					{...field}
					variant={isDisabled ? 'filled' : 'outline'}
					placeholder={placeholder}
					size={size}
					bg='white'
					// eslint-disable-next-line jsx-a11y/no-autofocus
					autoFocus={autoFocus}
				/>
				{!endAdornment && type === 'password' ? (
					<InputRightElement width='4.5rem' top='4px'>
						<IconButton
							icon={<Icon as={showPassword ? MdVisibility : MdVisibilityOff} size='lg' />}
							title={showPassword ? 'Show password' : 'Hide password'}
							tooltip={true}
							onClick={() => setShowPassword(!showPassword)}
						/>
					</InputRightElement>
				) : (
					<InputRightElement width='4.5rem' top='4px'>
						{/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
						<IconButton icon={endAdornment!} title='' onClick={onIconClick} />
					</InputRightElement>
				)}
			</InputGroup>
			{strengthMeter && <PasswordMeter passwordStrength={passwordStrength} />}
			<FormErrorMessage>{error}</FormErrorMessage>
		</FormControl>
	);
}
