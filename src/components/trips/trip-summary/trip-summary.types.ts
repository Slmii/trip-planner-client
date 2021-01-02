import { MeFragment } from '@generated/graphql';

export interface TripSummaryProps {
	tripId: number;
	me?: MeFragment | null;
	onClose: () => void;
}
