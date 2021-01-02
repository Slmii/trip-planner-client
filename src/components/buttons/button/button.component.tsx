import CircularProgress from '@material-ui/core/CircularProgress';
import MuiButton from '@material-ui/core/Button';

import { ButtonProps } from '@components/buttons/button';

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
			{loading ? <CircularProgress size='1rem' color={color !== 'default' ? color : 'inherit'} /> : children}
		</MuiButton>
	);
}
