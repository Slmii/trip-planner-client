export interface EmailFormProps {
	emailInvitations: string[];
	maxInvitations: number;
	error?: string;
	loading: boolean;
	onClose: () => void;
	onChipAdd: (email: string) => void;
	onChipDelete: (email: string) => void;
	onConfirm: () => void;
}
