import { DialogSize } from '@lib/redux/dialog';

import { ActivityFragment } from '../../../generated/graphql';

export interface ActivityInvitationProps {
	open: boolean;
	activity: ActivityFragment | null;
	size?: DialogSize;
}

export type ActivityInvitationState = ActivityInvitationProps;
