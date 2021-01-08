import { HeaderNotificationFragment } from '@generated/graphql';

export interface NotificationsProps {
	anchor: Element | null;
	onClose: () => void;
	onMarkAllAsRead: () => void;
	notifications: HeaderNotificationFragment[];
}

export interface StyledBadgeProps {
	read: boolean;
}
