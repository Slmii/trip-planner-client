import { ActivityType, TransportationType } from '@lib/types';
import { ActivityFragment } from '@generated/graphql';

export interface ActivityProps {
	activity: ActivityFragment;
	onDelete: (activityId: number) => void;
}

export interface TypeMapping {
	type: ActivityType | TransportationType;
	icon: JSX.Element;
}
