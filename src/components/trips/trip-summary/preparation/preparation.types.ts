import { PreparationFragment } from '@generated/graphql';

export interface PreparationProps {
	preparation: PreparationFragment;
	onDelete: (subPreparationId: number) => void;
	onStatusChange: (subPreparationId: number) => void;
	isLast: boolean;
}
