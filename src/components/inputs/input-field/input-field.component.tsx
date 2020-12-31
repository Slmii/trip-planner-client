import { useState } from 'react';
const IconButton = require('@material-ui/core/IconButton').default;
const InputAdornment = require('@material-ui/core/InputAdornment').default;
const VisibilityOff = require('@material-ui/icons/VisibilityOff').default;
const Visibility = require('@material-ui/icons/Visibility').default;

import { PasswordMeter } from '@components/password-meter';
import { InputFieldProps } from '@lib/types';

import { TextField } from './input-field.styled';

export default function InputField({
	field,
	name,
	value,
	label = '',
	type = 'text',
	required = false,
	disabled = false,
	error = '',
	touched = false,
	optional = false,
	multiline = false,
	fullWidth = true,
	rows = 4,
	placeholder = '',
	size = 'medium',
	strengthMeter = false,
	passwordStrength = '',
	startAdornment,
	endAdornment,
	onChange,
	onFocus,
	onFocusOut
}: InputFieldProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<>
			<TextField
				type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
				error={touched && Boolean(error)}
				label={label}
				helperText={touched && error ? error : ''}
				required={required}
				disabled={disabled}
				name={name}
				value={value}
				onFocus={onFocus}
				onBlur={onFocusOut}
				onChange={onChange}
				{...field}
				fullWidth={fullWidth}
				variant={disabled ? 'filled' : 'outlined'}
				multiline={multiline}
				rowsMax={rows}
				rows={rows}
				placeholder={placeholder}
				size={size}
				style={{
					background: 'white'
				}}
				InputProps={{
					startAdornment,
					endAdornment:
						!endAdornment && type === 'password' ? (
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={() => setShowPassword(prevState => !prevState)}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? (
										<Visibility fontSize={size === 'small' ? 'small' : size === 'medium' ? 'inherit' : ''} />
									) : (
										<VisibilityOff fontSize={size === 'small' ? 'small' : size === 'medium' ? 'inherit' : ''} />
									)}
								</IconButton>
							</InputAdornment>
						) : (
							endAdornment
						)
				}}
			/>
			{strengthMeter && <PasswordMeter passwordStrength={passwordStrength} />}
		</>
	);
}
