import cn from 'classnames';

import { Styled } from '@components/common/notifications';
import { NotificationProps } from '@components/common/notifications/notification';
import {
    ReadNotificationBadge,
    UnReadNotificationBadge
} from '@components/common/notifications/notification-badge';
import { NotificationType } from '@generated/graphql';
import { date, helpers } from '@lib/utils';

import { globalStyles } from '@styles/global-styled';

const Box = require('@material-ui/core/Box').default;
const Avatar = require('@material-ui/core/Avatar').default;
const Typography = require('@material-ui/core/Typography').default;
const ButtonBase = require('@material-ui/core/ButtonBase').default;

const Notification = ({ notification, onClick }: NotificationProps) => {
	const { id, sender, createdAt, type, read: isRead } = notification;
	const notificationDate = date.getDifferenceWithCurrentDate(createdAt);

	const { bold } = globalStyles();
	const { lineHeight } = Styled.notificationStyles();

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
				<Styled.NotificationSubTitle>
					{type === NotificationType.UpcomingActivity && 'You have an'}
					{type === NotificationType.UpcomingTrip && 'You have an'}
				</Styled.NotificationSubTitle>{' '}
				{type === NotificationType.UpcomingActivity && 'upcoming activity'}
				{type === NotificationType.UpcomingTrip && 'upcoming trip'}
			</>
		);
	};

	return (
		<ButtonBase onClick={() => onClick(id)}>
			<Styled.Notification read={isRead}>
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
							color={!isRead ? 'secondary' : 'textPrimary'}
							className={cn({
								[bold]: !isRead
							})}
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
						{notificationDate.time} {notificationDate.format ? `${notificationDate.format} ago` : null}
					</Typography>
				</Box>
			</Styled.Notification>
		</ButtonBase>
	);
};

export default Notification;
