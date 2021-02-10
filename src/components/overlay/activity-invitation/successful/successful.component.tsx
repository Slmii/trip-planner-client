import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';

import Button from '@components/buttons/button';
import { date } from '@lib/utils';

const Successful = ({ onClose }: { onClose: () => void }) => {
	return (
		<>
			<ModalHeader>Invitations are sent succesfully!</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<Text textStyle='body'>
					Invitations are valid for one hour and will expire after{' '}
					{date.formatDate({
						date: date.addUnitToCurrentDate(1, 'hour'),
						format: 'HH:mm'
					})}
					.
				</Text>
			</ModalBody>
			<ModalFooter>
				<Button onClick={onClose}>Close</Button>
			</ModalFooter>
		</>
	);
};

export default Successful;
