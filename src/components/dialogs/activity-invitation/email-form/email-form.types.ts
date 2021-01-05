export interface EmailFormProps {
	email: string;
	emailInvitations: string[];
	maxInvitations: number;
	error?: string;
	onClose: () => void;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChipDelete: (email: string) => void;
	onInputKeyDown: (event: React.KeyboardEvent) => void;
	onConfirm: () => void;
}
