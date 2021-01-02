import { Trip } from '@generated/graphql';

export interface TripsProps {
	trips: Trip[];
	loading: boolean;
	pageName: string;
	totalCount: number;
}
