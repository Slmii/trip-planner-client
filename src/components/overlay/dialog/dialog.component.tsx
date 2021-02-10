import {
    Box,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@components/buttons/button';
import { constants } from '@components/overlay/dialog';
import { selectDialog, setDialog } from '@lib/redux/dialog';

import spacing from '@theme/spacing';

export default function Dialog() {
	const dispatch = useDispatch();
	const dialog = useSelector(selectDialog);
	const { open, severity, body, title, size, onCancel, onConfirm } = dialog;

	const handleOnClose = () => {
		if (onCancel) {
			onCancel();
		}

		closeDialog();
	};

	const handleOnConfirm = async () => {
		if (onConfirm) {
			await onConfirm();
		}

		closeDialog();
	};

	const closeDialog = () => {
		dispatch(
			setDialog({
				...dialog,
				open: false
			})
		);
	};

	return (
		<Modal isCentered onClose={closeDialog} isOpen={open} motionPreset='slideInBottom' size={size}>
			<ModalOverlay />
			<ModalContent>
				<Box bg={`${constants.SEVERITY_COLOR[severity]}.500`} height='5px' borderTopRadius='base' />
				<ModalHeader>{title}</ModalHeader>
				<ModalBody>{body}</ModalBody>
				<ModalFooter>
					<HStack spacing={spacing.BUTTON}>
						<Button
							onClick={handleOnClose}
							variant={severity === 'error' ? 'solid' : 'ghost'}
							colorScheme={constants.SEVERITY_COLOR[severity]}
						>
							Cancel
						</Button>
						<Button
							onClick={handleOnConfirm}
							variant={severity === 'error' ? 'ghost' : 'solid'}
							colorScheme={constants.SEVERITY_COLOR[severity]}
						>
							Confirm
						</Button>
					</HStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
