const CircularProgress = require('@material-ui/core/CircularProgress').default;
const MuiButton = require('@material-ui/core/Button').default;

import { ButtonProps } from '@lib/types';

export default function Button({
	type = 'button',
	color = 'primary',
	size = 'medium',
	variant = 'contained',
	loading = false,
	fullWidth = true,
	className = '',
	disabled = false,
	startIcon,
	endIcon,
	onClick,
	children
}: ButtonProps) {
	return (
		<MuiButton
			type={type}
			variant={variant}
			color={color}
			size={size}
			fullWidth={fullWidth}
			disabled={disabled || loading}
			className={className}
			onClick={onClick}
			startIcon={startIcon}
			endIcon={endIcon}
		>
			{loading ? <CircularProgress size='1rem' color={color} /> : children}
		</MuiButton>
	);
}
