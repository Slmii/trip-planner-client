export interface IconButtonProps {
	title: string;
	icon: JSX.Element;
	tooltip?: boolean;
	onClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
	color?: 'primary' | 'secondary' | 'error';
}
