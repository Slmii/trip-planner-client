import { FormControl, FormLabel, Select } from '@chakra-ui/react';

import { InputSelectProps } from '@components/inputs/input-select';

const InputSelect = ({
	options,
	field,
	name,
	label,
	placeholder,
	size = 'lg',
	isDisabled = false,
	isReadOnly = false,
	isRequired = false,
	error,
	touched,
	onChange
}: InputSelectProps) => {
	return (
		<FormControl id={name} isRequired={isRequired} isInvalid={touched && Boolean(error)}>
			{label && <FormLabel>{label}</FormLabel>}
			<Select
				placeholder={placeholder}
				focusBorderColor='primary.500'
				errorBorderColor='red.500'
				_hover={{
					borderColor: 'black'
				}}
				id={name}
				name={name}
				isDisabled={isDisabled}
				isReadOnly={isReadOnly}
				onChange={onChange}
				{...field}
				size={size}
			>
				{options.map(({ value, label }, idx) => (
					<option key={idx} value={value}>
						{label}
					</option>
				))}
			</Select>
			{/* <FormErrorMessage>{error}</FormErrorMessage> */}
		</FormControl>
	);
};

export default InputSelect;
