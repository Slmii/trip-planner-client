import { Alert, AlertIcon, Box } from '@chakra-ui/react';

import { Severity } from '@lib/types';

const Toast = ({ severity, message, onUndo }: { severity: Severity; message: string; onUndo?: void }) => {
	return (
		<Box rounded='base'>
			<Alert status={severity}>
				<AlertIcon />
				{message}
			</Alert>
		</Box>
	);
};

export default Toast;
