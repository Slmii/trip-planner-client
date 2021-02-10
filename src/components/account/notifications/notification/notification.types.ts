import { NotificationFragment } from '@generated/graphql';

export interface NotificationProps {
	notification: NotificationFragment;
	onView: (notificationId: number) => void;
	onCollapse?: (notificationId: number) => void;
	onClear?: (notificationId: number) => void;
	isPage?: boolean;
}
