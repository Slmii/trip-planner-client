import { useApolloClient } from '@apollo/client';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AccountTitle from '@components/account/account-title';
import MarkAsRead from '@components/account/notifications/mark-as-read';
import NotificationsSkeleton from '@components/account/notifications/skeleton';
import Button from '@components/buttons/button';
import Notification from '@components/common/header-notifications/notification';
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
import { helpers } from '@lib/utils';

import { globalStyles } from '@styles/index';

const Notifications = () => {
	const apolloClient = useApolloClient();
	const router = useRouter();
	const [showOnlyUnread, setShowOnlyUnread] = useState(false);

	const { rows } = useSelector(selectFilters);
	const { page } = helpers.getQueryStringFilters(router.query);

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

	const { buttonMr } = globalStyles();

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
		});
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
		});
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

		const url = helpers.transformToNotificationRedirectUrl(notification.type, notification.uuid);

		router.push(url);
	};

	const handleOnOpenNotification = async (notificationId: number) => {
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
		});
	};

	let body: JSX.Element;

	if (loading && !data) {
		body = <NotificationsSkeleton number={10} />;
	} else if (data?.notifications.length) {
		body = (
			<>
				<Box display='flex' flexDirection='column'>
					{data.notifications.map(notification => (
						<Notification
							key={notification.id}
							notification={notification}
							isPage={true}
							onOpen={handleOnOpenNotification}
							onClear={handleOnClearNotification}
							onView={handleOnViewNotification}
						/>
					))}
					<Pagination count={Math.ceil(data.notifications.length / Number(rows))} />
				</Box>
			</>
		);
	} else {
		body = <>No notifications</>;
	}

	return (
		<>
			<AccountTitle title='Notifications' />
			<Box mb={1} display='flex' justifyContent='space-between' alignItems='center'>
				<FormControlLabel
					control={
						<Switch
							checked={showOnlyUnread}
							onChange={() => setShowOnlyUnread(prevState => !prevState)}
							name='showOnlyUnread'
						/>
					}
					labelPlacement='end'
					label={<Typography variant='subtitle1'>Show unread notifications</Typography>}
				/>
				<Box display='flex' alignContent='center'>
					<Button
						color='inherit'
						fullWidth={false}
						variant='outlined'
						className={buttonMr}
						onClick={handleOnClearAll}
					>
						Clear all
					</Button>
					<MarkAsRead isPage={true} onMarkAllAsRead={handleOnMarkAllAsRead} />
				</Box>
			</Box>
			{body}
		</>
	);
};

export default Notifications;
