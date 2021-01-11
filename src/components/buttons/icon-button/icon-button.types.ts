export interface IconButtonProps {
	title: string;
	icon: JSX.Element;
	tooltip?: boolean;
	disabled?: boolean;
	onClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
	color?: 'primary' | 'secondary' | 'error';
}
