import { ActivityFragment } from '@generated/graphql';
import { ActivityType, TransportationType } from '@lib/types';

export interface ActivityProps {
	activity: ActivityFragment;
	isInvitationDisabled: boolean;
	onDelete: (activityId: number) => void;
	onInvitation: (maxInvitations: number) => void;
}

export interface TypeMapping {
	type: ActivityType | TransportationType;
	icon: JSX.Element;
}
