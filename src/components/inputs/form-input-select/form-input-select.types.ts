import { InputSelectOption } from '@components/inputs/input-select';
import { Size } from '@lib/types';

export interface FormInputSelectProps {
	name: string;
	options: InputSelectOption[];
	label?: string;
	isRequired?: boolean;
	isDisabled?: boolean;
	isReadOnly?: boolean;
	strengthMeter?: boolean;
	placeholder?: string;
	size?: Size;
}
