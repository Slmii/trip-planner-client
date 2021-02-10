import { ColorKeys, Size } from '@lib/types';

export interface IconButtonProps {
	title: string;
	icon: JSX.Element;
	size?: Size;
	colorScheme?: ColorKeys;
	tooltip?: boolean;
	disabled?: boolean;
	onClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
}
