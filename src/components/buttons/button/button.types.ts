import { Color, Size, WithChildren } from '@lib/types';

export interface ButtonProps extends WithChildren {
	type?: ButtonType;
	color?: Color;
	variant?: ButtonVariant;
	size?: Size;
	loading?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
}

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonType = 'submit' | 'button' | 'reset';
