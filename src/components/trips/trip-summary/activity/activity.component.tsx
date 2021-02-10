import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    AvatarGroup,
    Box,
    Divider,
    Flex,
    HStack,
    Text,
    Tooltip,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaHiking } from 'react-icons/fa';
import {
    MdBeachAccess,
    MdDelete,
    MdDirectionsBus,
    MdDirectionsWalk,
    MdEmail,
    MdLocalTaxi,
    MdLocationCity,
    MdLock,
    MdLockOpen,
    MdMotorcycle,
    MdNaturePeople
} from 'react-icons/md';

import IconButton from '@components/buttons/icon-button';
import Icon from '@components/icon';
import TripDateAndLocations from '@components/trips/dates-and-locations';
import { ActivityProps, TypeMapping } from '@components/trips/trip-summary/activity';

import spacing from '@theme/spacing';

export const activityTypeIconMapping: TypeMapping[] = [
	{ type: 'hiking', icon: FaHiking },
	{ type: 'beach', icon: MdBeachAccess },
	{ type: 'tour', icon: MdLocationCity },
	{ type: 'nature', icon: MdNaturePeople }
];
export const transportationTypeIconMapping: TypeMapping[] = [
	{ type: 'taxi', icon: MdLocalTaxi },
	{ type: 'bus', icon: MdDirectionsBus },
	{ type: 'foot', icon: MdDirectionsWalk },
	{ type: 'motorbike', icon: MdMotorcycle }
];

const Activity = ({ activity, isInvitationDisabled, isProfilePrivate, onDelete, onInvitation }: ActivityProps) => {
	const {
		id,
		name,
		description,
		location,
		date,
		timezone,
		public: publicActivity,
		maxPeople,
		users,
		activityType,
		transportationType
	} = activity;

	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<AccordionItem
			_first={{
				mb: isExpanded ? '10px' : 0
			}}
			_notFirst={{
				my: isExpanded ? '10px' : 0
			}}
		>
			<AccordionButton
				onClick={() => {
					setIsExpanded(!isExpanded);
				}}
			>
				<Flex alignItems='center' flex='1' textAlign='left'>
					<Icon as={publicActivity ? MdLockOpen : MdLock} mr />
					<Text textStyle='notification-title-name'>{name}</Text>
				</Flex>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel>
				<VStack spacing={spacing.BODY_SPACING} align='stretch'>
					<TripDateAndLocations dateFrom={date} timezone={timezone} locations={[location]} />
					<Text textStyle='body'>{description}</Text>
					<Divider />
					<Flex justifyContent='space-between' alignItems='center'>
						<HStack spacing={spacing.BODY_SPACING_SMALL} height='48px'>
							<Tooltip
								hasArrow
								placement='left'
								label={
									<>
										{users.length}/{maxPeople} joining
										{users.length ? (
											<>
												<Divider />
												{users.map((user, idx) => (
													<Box key={idx}>{user.name}</Box>
												))}
											</>
										) : null}
									</>
								}
							>
								{users.length ? (
									<AvatarGroup max={3}>
										{users.map((user, idx) =>
											!user.public ? (
												<Avatar key={idx} size='sm' />
											) : (
												<Avatar
													size='sm'
													key={idx}
													name={user.name ?? ''}
													src={user.profileImgUrl ?? ''}
												/>
											)
										)}
									</AvatarGroup>
								) : publicActivity ? (
									<Text textStyle='subtitle'>No one has joined yet</Text>
								) : (
									<Box display='flex' flexDirection='column'>
										<Text textStyle='subtitle'>No one has joined yet.</Text>
										<Text textStyle='subtitle' lineHeight={1}>
											Private activities are only joinable by invitations.
										</Text>
									</Box>
								)}
							</Tooltip>
							{users.length ? (
								<>
									<Divider orientation='vertical' />
									<AvatarGroup>
										<Tooltip label={`Activity: ${activityType.name.toLowerCase()}`} hasArrow>
											<Avatar
												bg='primary.500'
												size='sm'
												mr={1}
												icon={
													<Icon
														color='white'
														size='sm'
														as={
															// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
															activityTypeIconMapping.find(
																({ type }) => type === activityType.type
															)!.icon
														}
													/>
												}
											/>
										</Tooltip>
										<Tooltip label={`Transport: ${transportationType.name.toLowerCase()}`} hasArrow>
											<Avatar
												bg='primary.500'
												size='sm'
												icon={
													<Icon
														color='white'
														size='sm'
														as={
															// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
															transportationTypeIconMapping.find(
																({ type }) => type === transportationType.type
															)!.icon
														}
													/>
												}
											/>
										</Tooltip>
									</AvatarGroup>
								</>
							) : null}
						</HStack>
						<Flex>
							<IconButton
								colorScheme='red'
								tooltip={true}
								icon={<Icon as={MdDelete} size='md' />}
								title='Delete'
								onClick={() => onDelete(id)}
								size='md'
							/>
							{isInvitationDisabled || isProfilePrivate ? (
								<IconButton
									colorScheme='primary'
									tooltip={true}
									icon={<Icon as={MdEmail} size='md' />}
									title={
										isInvitationDisabled
											? `${maxPeople} people have already joined`
											: 'Account needs to be public in order to send out invitations'
									}
									disabled={true}
									size='md'
								/>
							) : (
								<IconButton
									colorScheme='primary'
									tooltip={true}
									icon={<Icon as={MdEmail} size='md' />}
									title='Invite'
									onClick={() => onInvitation(activity)}
									size='md'
								/>
							)}
						</Flex>
					</Flex>
				</VStack>
			</AccordionPanel>
		</AccordionItem>
	);
};

export default React.memo(Activity);
