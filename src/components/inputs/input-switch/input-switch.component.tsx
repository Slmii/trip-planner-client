import { FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';

import { InputSwitchProps } from '@components/inputs/input-switch';

const InputSwitch = ({ name, checked, onChange, label, labelPlacement }: InputSwitchProps) => {
	return (
		<FormControl display='flex' alignItems='center'>
			{label && labelPlacement === 'start' && (
				<FormLabel htmlFor={`${name}-switch`} m={0} mr={3} cursor='pointer'>
					<Text fontWeight='bold' fontSize='sm'>
						{label}
					</Text>
				</FormLabel>
			)}
			<Switch
				id={`${name}-switch`}
				colorScheme='secondary'
				display='flex'
				isChecked={checked}
				onChange={onChange}
			/>
			{label && labelPlacement === 'end' && (
				<FormLabel htmlFor={`${name}-switch`} m={0} ml={3} cursor='pointer'>
					<Text fontWeight='bold' fontSize='sm'>
						{label}
					</Text>
				</FormLabel>
			)}
		</FormControl>
	);
};

export default InputSwitch;
