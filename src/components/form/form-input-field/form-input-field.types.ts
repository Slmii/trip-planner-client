export interface FormInputFieldProps {
	name: string;
	label?: string;
	type?: string;
	required?: boolean;
	disabled?: boolean;
	strengthMeter?: boolean;
	optional?: boolean;
	multiline?: boolean;
	rows?: number;
	placeholder?: string;
	size?: InputSize;
	startAdornment?: JSX.Element;
}

export type InputSize = 'small' | 'medium';
