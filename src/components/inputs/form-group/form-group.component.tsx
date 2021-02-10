import { Box } from '@chakra-ui/react';
import React from 'react';

export default function FormGroup({ children }: { children: React.ReactElement }) {
	return (
		<Box position='relative' width='100%' mb={4}>
			{children}
		</Box>
	);
}
