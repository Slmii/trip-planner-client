import { Styled } from '@components/common/notifications/notification-badge';

export const UnReadNotificationBadge = () => {
	return (
		<Styled.UnreadNotificationBadge
			overlap='circle'
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			variant='dot'
		/>
	);
};

export const ReadNotificationBadge = () => {
	return (
		<Styled.ReadNotificationBadge
			overlap='circle'
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			variant='dot'
		/>
	);
};
