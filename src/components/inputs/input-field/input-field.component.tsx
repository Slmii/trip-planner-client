import { useState } from 'react';
import cn from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MuiTextField from '@material-ui/core/TextField';
const InputAdornment = require('@material-ui/core/InputAdornment').default;
const VisibilityOff = require('@material-ui/icons/VisibilityOff').default;
const Visibility = require('@material-ui/icons/Visibility').default;

import PasswordMeter from '@components/password-meter';
import { InputFieldProps } from '@components/inputs/input-field';

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
	autoFocus = false,
	rows = 4,
	placeholder = '',
	size = 'medium',
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

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<>
			<MuiTextField
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
				onKeyDown={onKeyDown}
				{...field}
				fullWidth={fullWidth}
				variant={disabled ? 'filled' : 'outlined'}
				multiline={multiline}
				rowsMax={rows}
				rows={rows}
				placeholder={placeholder}
				size={size}
				// eslint-disable-next-line jsx-a11y/no-autofocus
				autoFocus={autoFocus}
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
						) : endAdornment ? (
							<InputAdornment position='end'>
								<IconButton onClick={() => onIconClick?.()} onMouseDown={handleMouseDownPassword}>
									{endAdornment}
								</IconButton>
							</InputAdornment>
						) : null
				}}
			/>
			{strengthMeter && <PasswordMeter passwordStrength={passwordStrength} />}
		</>
	);
}
