import { NotificationFragment } from '@generated/graphql';

export interface NotificationProps {
	notification: NotificationFragment;
	onView: (notificationId: number) => void;
	onOpen?: (notificationId: number) => void;
	onClear?: (notificationId: number) => void;
	isPage?: boolean;
}
