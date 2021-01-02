import { View, Rows } from '@lib/redux/filters';
import { Size } from '@lib/types';

export interface ToggleButtonProps {
	defaultValue: string;
	buttons: ToggleButtons[];
	onChange: (value: View | Rows) => void;
	size?: Size;
	orientation?: 'vertical' | 'horizontal';
}

interface ToggleButtons {
	value: string;
	title: string;
	label: string | JSX.Element;
}
