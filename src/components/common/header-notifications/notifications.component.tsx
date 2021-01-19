import { useApolloClient } from '@apollo/client';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';

import MarkAsRead from '@components/account/notifications/mark-as-read';
import Button from '@components/buttons/button';
import { NotificationsProps } from '@components/common/header-notifications';
import Notification from '@components/common/header-notifications/notification';
import {
    NotificationFragment,
    NotificationFragmentDoc,
    NotificationsDocument,
    NotificationsQuery,
    useMarkAllNotificationsAsReadMutation,
    useMarkNotificationAsReadMutation
} from '@generated/graphql';
import { helpers } from '@lib/utils';

import { globalStyles } from '@styles/shared.styled';
import theme from '@theme/index';

const Notifications = ({ notifications, onClose }: NotificationsProps) => {
	const apolloClient = useApolloClient();
	const router = useRouter();

	const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();
	const [markAsRead] = useMarkNotificationAsReadMutation();

	const { noBorderRadius } = globalStyles();

	const handleOnMarkAllAsRead = () => {
		markAllAsRead({
			update: cache => {
				const cachedNotifications = cache.readQuery<NotificationsQuery>({
					query: NotificationsDocument
				});

				if (!cachedNotifications) {
					return;
				}

				const modifiedNotifications = cachedNotifications.notifications.map(notification => ({
					...notification,
					read: true
				}));

				cache.writeQuery<NotificationsQuery>({
					query: NotificationsDocument,
					data: {
						notifications: modifiedNotifications
					}
				});
			}
		});
	};

	const handleOnViewNotification = async (notificationId: number) => {
		let url = '';

		const notification = apolloClient.readFragment<NotificationFragment>({
			id: `Notification:${notificationId}`,
			fragment: NotificationFragmentDoc,
			fragmentName: 'Notification'
		});

		if (notification && notification.read) {
			url = helpers.transformToNotificationRedirectUrl(notification.type, notification.uuid);
		} else {
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
				url = helpers.transformToNotificationRedirectUrl(
					response.data.setNotificationAsRead.type,
					response.data.setNotificationAsRead.uuid
				);
			} else {
				console.error(response.errors);
				return;
			}
		}

		onClose();
		router.push(url);
	};

	return (
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
				<MarkAsRead isPage={false} onMarkAllAsRead={handleOnMarkAllAsRead} />
			</Box>
			{notifications.length ? (
				<>
					<Box display='flex' flexDirection='column'>
						{notifications.map(notification => (
							<Notification
								key={notification.id}
								notification={notification}
								onView={handleOnViewNotification}
							/>
						))}
					</Box>
					<Button className={noBorderRadius} onClick={() => router.push('/account/notifications')}>
						See all notifications
					</Button>
				</>
			) : (
				<Box height='50px' display='flex' justifyContent='center' alignItems='center'>
					No notifications
				</Box>
			)}
		</Box>
	);
};

export default Notifications;
