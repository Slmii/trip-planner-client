import { DialogSize } from '@lib/redux/dialog';

export interface ActivityInvitationProps {
	open: boolean;
	maxInvitations: number;
	fullWidth?: boolean;
	maxWidth?: DialogSize;
}

export type ActivityInvitationState = ActivityInvitationProps;
