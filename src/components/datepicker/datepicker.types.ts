import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface DatePickerProps {
	date: ParsableDate;
	onChange: (date: MaterialUiPickersDate) => void;
}
