import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Divider,
    Flex,
    Heading,
    HStack,
    Text,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { NotificationProps } from '@components/account/notifications/notification';
import {
    ReadNotificationBadge,
    UnReadNotificationBadge
} from '@components/account/notifications/notification-badge';
import Button from '@components/buttons/button';
import TripDatesAndLocations from '@components/trips/dates-and-locations';
import { NotificationType } from '@generated/graphql';
import { date, helpers } from '@lib/utils';

import spacing from '@theme/spacing';

const Notification = ({ notification, onCollapse, isPage = false, onView, onClear }: NotificationProps) => {
	const { id, sender, createdAt, type, read: isRead, activity } = notification;
	const notificationDate = date.getDifferenceWithCurrentDate(createdAt);

	const [isExpanded, setIsExpanded] = useState(false);

	if (!sender) {
		throw Error('Sender is not known!');
	}

	const renderNotification = () => {
		return (
			<Flex
				alignItems='center'
				width='100%'
				p={isPage ? spacing.INNER_PADDING : 4}
				backgroundColor={isRead ? 'white' : 'primary.100'}
				cursor='pointer'
				_hover={{ backgroundColor: 'gray.100' }}
			>
				<Flex alignItems='center' mr={4}>
					{isRead ? <ReadNotificationBadge /> : <UnReadNotificationBadge />}
				</Flex>
				<Box mr={4}>
					<Avatar size={isPage ? 'lg' : 'md'} name={sender.name ?? ''} src={sender.profileImgUrl ?? ''} />
				</Box>
				<Box width='100%'>
					<Flex mb={2}>
						<Box
							textStyle={isPage ? 'notification-title-name' : 'notification-title-name-sm'}
							color={isRead ? 'text' : 'primary.500'}
						>
							{renderNotificationTitle()}
						</Box>
					</Flex>
					<Box textStyle={isPage ? 'subtitle' : 'subtitle-sm'} lineHeight='unset'>
						{notificationDate.time} {notificationDate.format ? `${notificationDate.format} ago` : null}
					</Box>
				</Box>
			</Flex>
		);
	};

	const renderNotificationTitle = () => {
		if (helpers.isActivityNotification(type)) {
			return (
				<>
					{sender?.name}{' '}
					<Box as='span' textStyle={isPage ? 'notification-title-descr' : 'notification-title-descr-sm'}>
						{type === NotificationType.ActivityInvitationSent && 'invited you to join an activity'}
						{type === NotificationType.ActivityJoinRequest && 'requested to join your activity'}
					</Box>
				</>
			);
		}

		return (
			<>
				<Box as='span' textStyle={isPage ? 'notification-title-name' : 'notification-title-name-sm'}>
					You have an
				</Box>{' '}
				{type === NotificationType.UpcomingActivity && 'upcoming activity'}
				{type === NotificationType.UpcomingTrip && 'upcoming trip'}
			</>
		);
	};

	return (
		<>
			{isPage ? (
				<AccordionItem
					_first={{
						mb: isExpanded ? '10px' : 0
					}}
					_notFirst={{
						my: isExpanded ? '10px' : 0
					}}
				>
					<AccordionButton
						p={0}
						pos='relative'
						onClick={() => {
							setIsExpanded(!isExpanded);
							onCollapse?.(id);
						}}
					>
						<Box flex='1' textAlign='left'>
							{renderNotification()}
						</Box>
						<AccordionIcon pos='absolute' right={9} />
					</AccordionButton>
					<AccordionPanel>
						<VStack spacing={spacing.BODY_SPACING} align='flex-start'>
							<Heading as='h2' textStyle='title'>
								{activity?.name}
							</Heading>
							<TripDatesAndLocations
								dateFrom={activity?.date}
								timezone={activity?.timezone}
								locations={[activity?.location ?? '']}
							/>
							<Text textStyle='body'>{activity?.description}</Text>
							<Divider />
							<HStack spacing={spacing.BUTTON} justify='flex-end' w='100%'>
								<Button
									colorScheme='red'
									variant='ghost'
									onClick={() => {
										setIsExpanded(false);
										onClear?.(id);
									}}
								>
									Clear
								</Button>
								<Button onClick={() => onView(id)}>
									View {helpers.isActivityNotification(type) ? 'activity' : 'trip'}
								</Button>
							</HStack>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			) : (
				<Box onClick={() => onView(id)}>{renderNotification()}</Box>
			)}
		</>
	);
};

export default Notification;

{
	/* <ActivityStyled.Accordion onChange={() => onOpen?.(id)}>
					<ActivityStyled.AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='my-trip-activities-content'
						id='my-trip-activities-header'
						ispage='true'
					>
						{renderNotification()}
					</ActivityStyled.AccordionSummary>
					<AccordionDetails className={accordionDetails}>
						<Box mb={1}>
							<ActivityStyled.AccordionTitle>
								<Typography className={accordionHeading}>{activity?.name}</Typography>
							</ActivityStyled.AccordionTitle>
						</Box>
						<Box mb={1}>
							<TripDatesAndLocations
								dateFrom={activity?.date}
								timezone={activity?.timezone}
								locations={[activity?.location ?? '']}
							/>
						</Box>
						<Typography variant='body2'>{activity?.description}</Typography>
						<Divider className={divider} />
						<Box mt={1} textAlign='right'>
							<Button
								colorScheme='red'
								variant='ghost'
								className={buttonMr}
								onClick={() => onClear?.(id)}
							>
								Clear
							</Button>
							<Button onClick={() => onView(id)}>
								View {helpers.isActivityNotification(type) ? 'activity' : 'trip'}
							</Button>
						</Box>
					</AccordionDetails>
				</ActivityStyled.Accordion> */
}
