import { NotificationFragment } from '@generated/graphql';

export interface NotificationsProps {
	notifications: NotificationFragment[];
	onClose: () => void;
}

export interface StyledBadgeProps {
	read: boolean;
}
