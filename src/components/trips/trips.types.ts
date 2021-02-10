import { Trip } from '@generated/graphql';

export interface TripsWrapperProps {
	heading: string;
	isLoading: boolean;
	trips: Trip[];
	totalCount: number;
	suffix?: string;
	hasFilters?: boolean;
}
