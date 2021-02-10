import { InputFieldType } from '@components/inputs/input-field';
import { Size } from '@lib/types';

export interface FormInputFieldProps {
	name: string;
	label?: string;
	type?: InputFieldType;
	isRequired?: boolean;
	isDisabled?: boolean;
	isReadOnly?: boolean;
	strengthMeter?: boolean;
	optional?: boolean;
	placeholder?: string;
	size?: Size;
	startAdornment?: JSX.Element;
	endAdornment?: JSX.Element;
}
