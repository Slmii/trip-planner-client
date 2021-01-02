import zxcvbn from 'zxcvbn';
import { useField } from 'formik';
import { useState, useEffect } from 'react';

import InputField from '@components/inputs/input-field';
import { FormInputFieldProps } from '@components/form/form-input-field';

export default function FormInputField({
	name,
	label,
	type = 'text',
	required = false,
	disabled = false,
	strengthMeter = false,
	optional = false,
	multiline = false,
	rows = 4,
	placeholder = '',
	size = 'medium'
}: FormInputFieldProps) {
	const [field, meta, _helpers] = useField(name);
	const [passwordStrength, setPasswordStrength] = useState<string>('');

	useEffect(() => {
		if (strengthMeter) {
			setPasswordStrength((zxcvbn(meta.value).score + 1).toString());
		}
	}, [meta.value, strengthMeter]);

	return (
		<InputField
			field={field}
			label={label}
			type={type}
			required={required}
			disabled={disabled}
			error={meta.error}
			touched={meta.touched}
			optional={optional}
			multiline={multiline}
			rows={rows}
			placeholder={placeholder}
			size={size}
			strengthMeter={strengthMeter}
			passwordStrength={passwordStrength}
		/>
	);
}
