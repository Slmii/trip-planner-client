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
	size = 'md',
	strengthMeter = false,
	passwordStrength = '',
	startAdornment,
	endAdornment,
	onChange,
	onClick,
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
					onClick={onClick}
					{...field}
					variant={isDisabled ? 'filled' : 'outline'}
					placeholder={placeholder}
					size={size}
					bg='white'
					// eslint-disable-next-line jsx-a11y/no-autofocus
					autoFocus={autoFocus}
					borderBottomRadius={strengthMeter && passwordStrength && passwordStrength !== '1' ? 0 : undefined}
				/>
				{!endAdornment && type === 'password' ? (
					<InputRightElement width='4.5rem' top={size === 'lg' ? '4px' : '0px'}>
						<IconButton
							icon={<Icon as={showPassword ? MdVisibility : MdVisibilityOff} size={size} />}
							title={showPassword ? 'Hide password' : 'Show password'}
							tooltip={true}
							onClick={() => setShowPassword(!showPassword)}
							size={size}
						/>
					</InputRightElement>
				) : endAdornment ? (
					<InputRightElement width='4.5rem' top='4px'>
						{/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
						<IconButton icon={endAdornment!} title='' onClick={onIconClick} />
					</InputRightElement>
				) : null}
			</InputGroup>
			{strengthMeter && passwordStrength && passwordStrength !== '1' ? (
				<PasswordMeter passwordStrength={passwordStrength} />
			) : null}
			<FormErrorMessage>{error}</FormErrorMessage>
		</FormControl>
	);
}
