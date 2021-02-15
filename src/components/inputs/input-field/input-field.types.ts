import { FieldInputProps } from 'formik';

import { Size } from '@lib/types';

export interface InputFieldProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field?: FieldInputProps<any>;
	value?: string;
	name?: string;
	label?: string;
	type?: InputFieldType;
	isRequired?: boolean;
	isReadOnly?: boolean;
	isDisabled?: boolean;
	error?: string;
	touched?: boolean;
	strengthMeter?: boolean;
	passwordStrength?: string | null;
	optional?: boolean;
	autoFocus?: boolean;
	placeholder?: string;
	size?: Size;
	startAdornment?: JSX.Element;
	endAdornment?: JSX.Element;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
	onFocus?: (event: React.FocusEvent) => void;
	onFocusOut?: (event: React.FocusEvent) => void;
	onIconClick?: () => void;
	onKeyDown?: (event: React.KeyboardEvent) => void;
}

export type InputFieldType = 'text' | 'number' | 'password' | 'date';
