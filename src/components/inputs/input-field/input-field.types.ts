import { FieldInputProps } from 'formik';

import { InputSize } from '@components/form/form-input-field';

export interface InputFieldProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field?: FieldInputProps<any>;
	value?: string;
	name?: string;
	label?: string;
	type?: string;
	required?: boolean;
	disabled?: boolean;
	error?: string;
	touched?: boolean;
	strengthMeter?: boolean;
	passwordStrength?: string;
	optional?: boolean;
	multiline?: boolean;
	fullWidth?: boolean;
	autoFocus?: boolean;
	rows?: number;
	placeholder?: string;
	size?: InputSize;
	startAdornment?: JSX.Element;
	endAdornment?: JSX.Element;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent) => void;
	onFocusOut?: (event: React.FocusEvent) => void;
	onIconClick?: () => void;
	onKeyDown?: (event: React.KeyboardEvent) => void;
}
