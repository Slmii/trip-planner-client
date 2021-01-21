import AccordionDetails from '@material-ui/core/AccordionDetails';
import Divider from '@material-ui/core/Divider';
import cn from 'classnames';

import Button from '@components/buttons/button';
import { Styled } from '@components/common/header-notifications';
import { NotificationProps } from '@components/common/header-notifications/notification';
import {
    ReadNotificationBadge,
    UnReadNotificationBadge
} from '@components/common/header-notifications/notification-badge';
import TripDatesAndLocations from '@components/trips/dates-and-locations';
import { Styled as ActivityStyled } from '@components/trips/trip-summary/activity';
import { NotificationType } from '@generated/graphql';
import { date, helpers } from '@lib/utils';

import { globalStyles } from '@styles/index';

const ExpandMoreIcon = require('@material-ui/icons/ExpandMore').default;

const Box = require('@material-ui/core/Box').default;
const Avatar = require('@material-ui/core/Avatar').default;
const Typography = require('@material-ui/core/Typography').default;
const ButtonBase = require('@material-ui/core/ButtonBase').default;

const Notification = ({ notification, onOpen, isPage, onView, onClear }: NotificationProps) => {
	const { id, sender, createdAt, type, read: isRead, activity } = notification;
	const notificationDate = date.getDifferenceWithCurrentDate(createdAt);

	const { bold, buttonMr, divider } = globalStyles();
	const { lineHeight, borderBottomNone } = Styled.notificationStyles();
	const { accordionDetails, accordionHeading } = ActivityStyled.activityStyles();

	const renderNotification = () => {
		if ([NotificationType.ActivityInvitationSent, NotificationType.ActivityJoinRequest].includes(type)) {
			return (
				<>
					{sender?.name}{' '}
					<Styled.NotificationSubTitle>
						{type === NotificationType.ActivityInvitationSent && 'invited you to join an activity'}
						{type === NotificationType.ActivityJoinRequest && 'requested to join your activity'}
					</Styled.NotificationSubTitle>
				</>
			);
		}

		return (
			<>
				<Styled.NotificationSubTitle>You have an</Styled.NotificationSubTitle>{' '}
				{type === NotificationType.UpcomingActivity && 'upcoming activity'}
				{type === NotificationType.UpcomingTrip && 'upcoming trip'}
			</>
		);
	};

	return (
		<>
			{isPage ? (
				<ActivityStyled.Accordion onChange={() => onOpen?.(id)}>
					<ActivityStyled.AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='my-trip-activities-content'
						id='my-trip-activities-header'
						ispage='true'
					>
						<Styled.Notification read={isRead} isPage={true}>
							<Box mr={1} display='flex' alignItems='center'>
								{!isRead ? <UnReadNotificationBadge /> : <ReadNotificationBadge />}
							</Box>
							<Box mr={1}>
								<Avatar style={{ width: 66, height: 66 }}>
									{helpers.transformToAvatarInitials(sender?.name ?? '')}
								</Avatar>
							</Box>
							<Box width='100%'>
								<Box display='flex' mb={0.5}>
									<Styled.NotificationTitle
										variant='body2'
										color={!isRead ? 'primary' : 'textPrimary'}
									>
										{renderNotification()}
									</Styled.NotificationTitle>
								</Box>
								<Typography
									variant='subtitle1'
									color='textSecondary'
									className={cn(bold, lineHeight)}
									style={{ textAlign: 'left' }}
								>
									{notificationDate.time}{' '}
									{notificationDate.format ? `${notificationDate.format} ago` : null}
								</Typography>
							</Box>
						</Styled.Notification>
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
						<Box mt={1}>
							<Button
								color='inherit'
								variant='outlined'
								fullWidth={false}
								className={buttonMr}
								onClick={() => onClear?.(id)}
							>
								Clear
							</Button>
							<Button fullWidth={false} onClick={() => onView(id)}>
								View
							</Button>
						</Box>
					</AccordionDetails>
				</ActivityStyled.Accordion>
			) : (
				<ButtonBase onClick={() => onView(id)} className={borderBottomNone}>
					<Styled.Notification read={isRead} isPage={false}>
						<Box mr={1} display='flex' alignItems='center'>
							{!isRead ? <UnReadNotificationBadge /> : <ReadNotificationBadge />}
						</Box>
						<Box mr={1}>
							<Avatar style={{ width: 44, height: 44 }}>
								{helpers.transformToAvatarInitials(sender?.name ?? '')}
							</Avatar>
						</Box>
						<Box width='100%'>
							<Box display='flex' mb={0.5}>
								<Styled.NotificationTitle
									variant='subtitle1'
									color={!isRead ? 'primary' : 'textPrimary'}
								>
									{renderNotification()}
								</Styled.NotificationTitle>
							</Box>
							<Typography
								variant='subtitle2'
								color='textSecondary'
								className={cn(bold, lineHeight)}
								style={{ textAlign: 'left' }}
							>
								{notificationDate.time}{' '}
								{notificationDate.format ? `${notificationDate.format} ago` : null}
							</Typography>
						</Box>
					</Styled.Notification>
				</ButtonBase>
			)}
		</>
	);
};

export default Notification;