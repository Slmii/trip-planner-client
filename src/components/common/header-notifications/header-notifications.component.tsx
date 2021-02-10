import { useApolloClient } from '@apollo/client';
import { Badge, Box, Flex, StackDivider, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdNotifications, MdNotificationsActive } from 'react-icons/md';

import MarkAsRead from '@components/account/notifications/mark-as-read';
import Notification from '@components/account/notifications/notification';
import Button from '@components/buttons/button';
import IconButton from '@components/buttons/icon-button';
import Icon from '@components/icon';
import Popover from '@components/overlay/popover';
import {
    NotificationFragment,
    NotificationFragmentDoc,
    NotificationsDocument,
    NotificationsQuery,
    useMarkAllNotificationsAsReadMutation,
    useMarkNotificationAsReadMutation,
    useNotificationsQuery
} from '@generated/graphql';
import { url } from '@lib/utils';

const NotificationHeader = ({ onMarkAllAsRead }: { onMarkAllAsRead: () => void }) => {
	return (
		<Flex justifyContent='space-between' alignItems='center' px={4} py={2}>
			<Box fontSize='md' fontWeight='bold'>
				Notifications
			</Box>
			<MarkAsRead isPage={false} onMarkAllAsRead={onMarkAllAsRead} />
		</Flex>
	);
};

const NotificationContent = ({
	notifications,
	onViewNotification
}: {
	notifications: NotificationFragment[];
	onViewNotification: (notificationId: number) => void;
}) => {
	return (
		<VStack divider={<StackDivider margin='0 !important' />} align='stretch'>
			{notifications.map(notification => (
				<Notification
					key={notification.id}
					notification={notification}
					onView={notificationId => onViewNotification(notificationId)}
				/>
			))}
		</VStack>
	);
};

const NotificationFooter = ({
	hasNotifications,
	onCloseNotifications
}: {
	hasNotifications: boolean;
	onCloseNotifications: () => void;
}) => {
	return (
		<>
			{hasNotifications ? (
				<Button isFullWidth={true} onClick={onCloseNotifications} borderTopRadius={0}>
					See all notifications
				</Button>
			) : (
				<Flex height='50px' justifyContent='center' alignItems='center'>
					No notifications
				</Flex>
			)}
		</>
	);
};

const Notifications = () => {
	const router = useRouter();

	const apolloClient = useApolloClient();
	const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();
	const [markAsRead] = useMarkNotificationAsReadMutation();
	const { data } = useNotificationsQuery();

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
		}).catch(err => console.log(err));
	};

	const handleOnViewNotification = async (notificationId: number) => {
		let redirectUrl = '';

		const notification = apolloClient.readFragment<NotificationFragment>({
			id: `Notification:${notificationId}`,
			fragment: NotificationFragmentDoc,
			fragmentName: 'Notification'
		});

		if (notification && notification.read) {
			redirectUrl = url.transformToNotificationRedirectUrl(notification.type, notification.uuid);
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
				redirectUrl = url.transformToNotificationRedirectUrl(
					response.data.setNotificationAsRead.type,
					response.data.setNotificationAsRead.uuid
				);
			} else {
				console.error(response.errors);
				return;
			}
		}

		router.push(redirectUrl);
	};

	const unreadNotifications = data?.notifications.filter(notification => !notification.read).length;

	return (
		<Popover
			header={() => <NotificationHeader onMarkAllAsRead={handleOnMarkAllAsRead} />}
			body={({ onClose }) => (
				<NotificationContent
					onViewNotification={notificationId => {
						onClose();
						handleOnViewNotification(notificationId);
					}}
					notifications={data?.notifications ?? []}
				/>
			)}
			footer={({ onClose }) => (
				<NotificationFooter
					onCloseNotifications={() => {
						onClose();
						router.push('/account/notifications');
					}}
					hasNotifications={Boolean(data?.notifications.length)}
				/>
			)}
			trigger={() => (
				<IconButton
					icon={
						typeof unreadNotifications !== 'undefined' && unreadNotifications > 0 ? (
							<>
								<Badge
									colorScheme='secondary'
									variant='solid'
									position='absolute'
									top={0}
									right={0}
									rounded={50}
								>
									{unreadNotifications}
								</Badge>
								<Icon as={MdNotificationsActive} size='lg' color='white' />
							</>
						) : (
							<Icon as={MdNotifications} size='lg' color='white' />
						)
					}
					colorScheme='whiteAlpha'
					title={unreadNotifications ? 'You have unread notifications' : ''}
					tooltip={true}
				/>
			)}
		/>
	);
};

export default Notifications;
