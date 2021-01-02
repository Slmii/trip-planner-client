import React from 'react';
import { DatePicker as MuiDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { DatePickerProps } from '@components/datepicker';

const DatePicker = ({ date, onChange }: DatePickerProps) => {
	const handleOnChange = (date: MaterialUiPickersDate) => {
		onChange(date);
	};

	return <MuiDatePicker autoOk variant='static' openTo='date' value={date} animateYearScrolling onChange={handleOnChange} />;
};

export default React.memo(DatePicker);
