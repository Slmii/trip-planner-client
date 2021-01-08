import { HeaderNotificationFragment } from '@generated/graphql';

export interface NotificationProps {
	notification: HeaderNotificationFragment;
	onClick: (notificationId: number) => void;
}
