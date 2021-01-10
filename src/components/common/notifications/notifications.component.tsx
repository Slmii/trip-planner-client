import React from 'react';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router';

import Popover from '@components/popover';
import Notification from '@components/common/notifications/notification';
import { Styled, NotificationsProps } from '@components/common/notifications';
import { NotificationType, useMarkHeaderNotificationAsReadMutation } from '@generated/graphql';

import theme from '@theme/index';

const Notifications = ({ anchor, onClose, onMarkAllAsRead, notifications }: NotificationsProps) => {
	const router = useRouter();

	const [markAsRead] = useMarkHeaderNotificationAsReadMutation();

	const handleOnNotificationClick = async (notificationId: number) => {
		const response = await markAsRead({
			variables: {
				notificationId
			},
			update: cache => {
				cache.modify({
					id: `Notification:${notificationId}`,
					fields: {
						read() {
							return true;
						}
					}
				});
			}
		});

		if (response.data) {
			let url = '';

			const type = response.data.setNotificationAsRead.type;
			const uuid = response.data.setNotificationAsRead.uuid;

			if (type === NotificationType.ActivityInvitationReceived) {
				url = `/account/invitations#${uuid}`;
			} else if (type === NotificationType.ActivityJoinRequest) {
				url = `/account/requests#${uuid}`;
			} else if (type === NotificationType.UpcomingActivity) {
				url = `/activities/my-activities#${uuid}`;
			} else if (type === NotificationType.UpcomingTrip) {
				url = `/trips/my-trips#${uuid}`;
			}

			router.push(url);
		} else {
			console.log(response.errors);
		}
	};

	return (
		<Popover anchorEl={anchor} type='notifications' onClose={onClose} position='center'>
			<Box width='350px' display='flex' flexDirection='column'>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					p={1}
					borderBottom={`1px solid ${theme.palette.borderColor}`}
				>
					<Box fontSize={theme.typography.fontSize} fontWeight='bold'>
						Notifications
					</Box>
					<ButtonBase onClick={onMarkAllAsRead}>
						<Styled.MarkAllAsRead variant='caption' color='secondary'>
							Mark all as read
						</Styled.MarkAllAsRead>
					</ButtonBase>
				</Box>
				{notifications.length ? (
					<>
						<Box display='flex' flexDirection='column'>
							{notifications.map(notification => (
								<Notification key={notification.id} notification={notification} onClick={handleOnNotificationClick} />
							))}
						</Box>
						<ButtonBase>
							<Styled.SeeAllNotifications>See all notifications</Styled.SeeAllNotifications>
						</ButtonBase>
					</>
				) : (
					<Box height='50px' display='flex' justifyContent='center' alignItems='center'>
						No notifications
					</Box>
				)}
			</Box>
		</Popover>
	);
};

export default Notifications;
