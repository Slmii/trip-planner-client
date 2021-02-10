export interface DatePickerProps {
	startDate: Date | null;
	endDate?: Date | null;
	isRange?: boolean;
	onChange: (
		date: Date | [Date, Date] | /* for selectsRange */ null,
		event: React.SyntheticEvent<unknown> | undefined
	) => void;
}
