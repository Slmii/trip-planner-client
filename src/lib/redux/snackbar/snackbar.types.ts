import { Severity } from '@lib/types';

export type SnackbarProps = {
	open: boolean;
	severity: Severity;
	message: string;
	onUndo?: () => void;
};

export type SnackbarState = SnackbarProps;
