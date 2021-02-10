import {
    Flex,
    HStack,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    Wrap,
    WrapItem
} from '@chakra-ui/react';

import Button from '@components/buttons/button';
import InputField from '@components/inputs/input-field';
import { EmailFormProps } from '@components/overlay/activity-invitation';

import spacing from '@theme/spacing';

const EmailForm = ({
	value,
	emailInvitations,
	maxInvitations,
	error,
	loading,
	onClose,
	onChange,
	onChipAdd,
	onChipDelete,
	onConfirm
}: EmailFormProps) => {
	const hasMaximumInvitations = emailInvitations.length > maxInvitations;

	return (
		<>
			<ModalHeader>
				Invite people to join your activity
				<Text textStyle='subtitle' color='text'>
					People who join can see your activity in their upcoming activities list.
				</Text>
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<Flex flexDirection='column'>
					<InputField
						// eslint-disable-next-line jsx-a11y/no-autofocus
						autoFocus={true}
						isRequired={true}
						error={error}
						touched={true}
						label='Email address(es)'
						onKeyDown={onChipAdd}
						onChange={onChange}
						value={value}
					/>

					{emailInvitations.length ? (
						<>
							<Flex mt={5} flexDirection='column'>
								<Wrap>
									<WrapItem>
										<Text textStyle='body' mb={hasMaximumInvitations ? 1 : 0}>
											Invite{' '}
											<Tag size='md' borderRadius='full' variant='solid' colorScheme='secondary'>
												<TagLabel>{emailInvitations.length}</TagLabel>
											</Tag>{' '}
											{emailInvitations.length > 1 ? 'people' : 'person'}:{' '}
										</Text>
									</WrapItem>
									{emailInvitations.map(email => (
										<WrapItem key={email}>
											<Tag size='md' borderRadius='full' variant='solid' colorScheme='secondary'>
												<TagLabel>{email}</TagLabel>
												<TagCloseButton onClick={() => onChipDelete(email)} />
											</Tag>
										</WrapItem>
									))}
								</Wrap>
								{hasMaximumInvitations && (
									<Text textStyle='subtitle' lineHeight='none' color='red.500' mt={5}>
										Please note that a maximum of {maxInvitations} people can join. If you sent out
										more than {maxInvitations} invitations it will be dealt with on a first come,
										first served basis.
									</Text>
								)}
							</Flex>
						</>
					) : null}
				</Flex>
			</ModalBody>
			<ModalFooter>
				<HStack spacing={spacing.BUTTON}>
					<Button onClick={onClose} variant='ghost'>
						Cancel
					</Button>
					<Button
						variant='solid'
						onClick={onConfirm}
						isLoading={loading}
						isDisabled={!emailInvitations.length}
					>
						Send invitations
					</Button>
				</HStack>
			</ModalFooter>
		</>
	);
};

export default EmailForm;
