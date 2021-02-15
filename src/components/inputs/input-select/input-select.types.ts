import { FieldInputProps } from 'formik';

import { Size } from '@lib/types';

export interface InputSelectProps {
	options: InputSelectOption[];
	field?: FieldInputProps<any>;
	name?: string;
	label?: string;
	placeholder?: string;
	size?: Size;
	isRequired?: boolean;
	isReadOnly?: boolean;
	isDisabled?: boolean;
	error?: string;
	touched?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface InputSelectOption {
	value: string | number;
	label: string;
}
