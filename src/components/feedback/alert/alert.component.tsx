import { Alert as CUIAlert, AlertIcon } from '@chakra-ui/react';

import { AlertProps } from '@components/feedback/alert';

const Alert = ({ status, error }: AlertProps) => {
	return (
		<CUIAlert status={status}>
			<AlertIcon />
			{error}
		</CUIAlert>
	);
};

export default Alert;
