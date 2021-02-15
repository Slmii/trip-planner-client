import { useField } from 'formik';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';

import { FormInputFieldProps } from '@components/inputs/form-input-field';
import InputField from '@components/inputs/input-field';

export default function FormInputField({
	name,
	label,
	type = 'text',
	isRequired = false,
	isDisabled = false,
	isReadOnly = false,
	strengthMeter = false,
	optional = false,
	placeholder = '',
	size = 'md',
	onClick
}: FormInputFieldProps) {
	const [field, meta, _helpers] = useField(name);
	const [passwordStrength, setPasswordStrength] = useState<string | null>('');

	useEffect(() => {
		if (strengthMeter) {
			setPasswordStrength(meta.value ? (zxcvbn(meta.value).score + 1).toString() : null);
		}
	}, [meta.value, strengthMeter]);

	return (
		<InputField
			onClick={onClick}
			field={field}
			label={label}
			type={type}
			isRequired={isRequired}
			isDisabled={isDisabled}
			isReadOnly={isReadOnly}
			error={meta.error}
			touched={meta.touched}
			optional={optional}
			placeholder={placeholder}
			size={size}
			strengthMeter={strengthMeter}
			passwordStrength={passwordStrength}
		/>
	);
}
