import { useApolloClient } from '@apollo/client';
import { Accordion, Box, Flex, Heading, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AccountTitle from '@components/account/account-title';
import MarkAsRead from '@components/account/notifications/mark-as-read';
import Notification from '@components/account/notifications/notification';
import NotificationsSkeleton from '@components/account/notifications/skeleton';
import Button from '@components/buttons/button';
import InputSwitch from '@components/inputs/input-switch';
import Pagination from '@components/pagination';
import {
    NotificationFragment,
    NotificationFragmentDoc,
    NotificationsDocument,
    NotificationsQuery,
    useClearAllNotificationsMutation,
    useClearNotificationMutation,
    useMarkAllNotificationsAsReadMutation,
    useMarkNotificationAsReadMutation,
    useNotificationsQuery
} from '@generated/graphql';
import { selectFilters } from '@lib/redux/filters';
import { url } from '@lib/utils';

import spacing from '@theme/spacing';

const Notifications = () => {
	const apolloClient = useApolloClient();
	const router = useRouter();
	const [showOnlyUnread, setShowOnlyUnread] = useState(false);

	const { rows } = useSelector(selectFilters);
	const { page } = url.getQueryStringFilters(router.query);

	const [clear] = useClearNotificationMutation();
	const [clearAll] = useClearAllNotificationsMutation();
	const [markAsRead] = useMarkNotificationAsReadMutation();
	const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();
	const { data, loading } = useNotificationsQuery({
		variables: {
			read: showOnlyUnread ? false : undefined,
			pagination: {
				skip: (page - 1) * Number(rows),
				take: Number(rows)
			}
		}
	});

	const handleOnClearAll = () => {
		clearAll({
			update: cache => {
				cache.modify({
					fields: {
						notifications() {
							return [];
						}
					}
				});
			}
		}).catch(err => console.log(err));
	};

	// TODO: make this a generic function because it now defined twice in header- and page notifications
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
		const notification = apolloClient.readFragment<NotificationFragment>({
			id: `Notification:${notificationId}`,
			fragment: NotificationFragmentDoc,
			fragmentName: 'Notification'
		});

		if (!notification) {
			return;
		}

		const redirectUrl = url.transformToNotificationRedirectUrl(notification.type, notification.uuid);

		router.push(redirectUrl);
	};

	const handleOnCollapseNotification = async (notificationId: number) => {
		const notification = apolloClient.readFragment<NotificationFragment>({
			id: `Notification:${notificationId}`,
			fragment: NotificationFragmentDoc,
			fragmentName: 'Notification'
		});

		if (!notification || notification.read) {
			return;
		}

		markAsRead({
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
		}).catch(err => console.log(err));
	};

	const handleOnClearNotification = (notificationId: number) => {
		clear({
			variables: {
				notificationId
			},
			update: cache => {
				cache.evict({ id: `Notification:${notificationId}` });
			}
		}).catch(err => console.log(err));
	};

	let body: JSX.Element;

	if (loading && !data) {
		body = <NotificationsSkeleton number={10} />;
	} else if (data?.notifications.length) {
		body = (
			<>
				<Flex flexDirection='column'>
					<Accordion defaultIndex={[]} allowMultiple>
						{data.notifications.map(notification => (
							<Notification
								key={notification.id}
								notification={notification}
								isPage={true}
								onCollapse={handleOnCollapseNotification}
								onClear={handleOnClearNotification}
								onView={handleOnViewNotification}
							/>
						))}
					</Accordion>
					<Pagination count={Math.ceil(data.notifications.length / Number(rows))} />
				</Flex>
			</>
		);
	} else {
		body = (
			<Flex justifyContent='center'>
				<VStack spacing={spacing.BODY_SPACING_LARGE} mt={10} align='center'>
					<Box>
						<Image src='/assets/illustrations/empty_inbox.svg' alt='Not found' width={500} height={250} />
					</Box>
					<Heading as='h2' textStyle='title'>
						You have no (unread) notifications
					</Heading>
				</VStack>
			</Flex>
		);
	}

	return (
		<>
			<AccountTitle heading='Notifications' suffix={`(${data?.notifications.length ?? 0} results)`} />
			<Flex justifyContent='space-between' alignItems='center'>
				<InputSwitch
					name='unread'
					checked={showOnlyUnread}
					onChange={e => setShowOnlyUnread(e.target.checked)}
					label='Show unread notifications'
					labelPlacement='end'
				/>
				{data?.notifications.length ? (
					<Flex alignContent='center'>
						<Button colorScheme='red' variant='ghost' onClick={handleOnClearAll}>
							Clear all
						</Button>
						<MarkAsRead isPage={true} onMarkAllAsRead={handleOnMarkAllAsRead} />
					</Flex>
				) : null}
			</Flex>
			{body}
		</>
	);
};

export default Notifications;
