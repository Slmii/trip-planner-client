import { ColorKeys, Size, WithChildren } from '@lib/types';

export interface ButtonProps extends WithChildren {
	type?: ButtonType;
	colorScheme?: ColorKeys;
	variant?: ButtonVariant;
	size?: Size;
	isLoading?: boolean;
	isFullWidth?: boolean;
	isDisabled?: boolean;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	spinner?: JSX.Element;
	loadingText?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
}

export type ButtonVariant = 'ghost' | 'outline' | 'solid' | 'link' | 'unstyled';
export type ButtonType = 'submit' | 'button' | 'reset';
