import { useField } from 'formik';

import { FormInputSelectProps } from '@components/inputs/form-input-select';
import InputSelect from '@components/inputs/input-select';

const FormInputSelect = ({
	name,
	label,
	isRequired = false,
	isDisabled = false,
	isReadOnly = false,
	options,
	placeholder = '',
	size = 'lg'
}: FormInputSelectProps) => {
	const [field, meta, helpers] = useField(name);

	return (
		<InputSelect
			field={field}
			label={label}
			isRequired={isRequired}
			isDisabled={isDisabled}
			isReadOnly={isReadOnly}
			error={meta.error}
			touched={meta.touched}
			placeholder={placeholder}
			size={size}
			options={options}
		/>
	);
};

export default FormInputSelect;
