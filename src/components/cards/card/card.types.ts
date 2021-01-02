import { Trip } from '@generated/graphql';

export interface CardProps {
	trip: Trip;
	isUpcomingTrip: boolean;
	isSelected: boolean;
	isCreator: boolean;
	isDeleteAvailable: boolean;
	onDelete: (tripId: number) => void;
	onView: (tripId: number) => void;
	onAddFavorite: (tripId: number) => void;
	onDeleteFavorite: (tripId: number) => void;
	onClose: () => void;
}
