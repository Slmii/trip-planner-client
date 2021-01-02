import { PreparationFragment } from '@generated/graphql';

export interface PreparationProps {
	preparation: PreparationFragment;
	onDelete: (preparationId: number) => void;
	onStatusChange: (preparationId: number) => void;
}
