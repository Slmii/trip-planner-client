import { chakra } from '@chakra-ui/react';

import Paper from '@components/paper';

export const Content = chakra(Paper, {
	baseStyle: {
		display: 'flex',
		justifyContent: 'center',
		w: '500px',
		margin: '0 auto',
		mt: 20,
		p: '30px'
	}
});
