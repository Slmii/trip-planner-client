import { Box, BoxProps } from '@chakra-ui/react';

const Paper = ({ children, ...props }: BoxProps & { children: React.ReactNode }) => {
	return (
		<Box {...props} boxShadow='base' borderRadius='base' borderColor='border' borderStyle='solid' borderWidth='1px'>
			{children}
		</Box>
	);
};

export default Paper;
