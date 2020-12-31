import React from 'react';
import { DatePicker as MuiDatePicker } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const DatePicker = ({ date, onChange }: { date: ParsableDate; onChange: (date: MaterialUiPickersDate) => void }) => {
	const handleOnChange = (date: MaterialUiPickersDate) => {
		onChange(date);
	};

	return <MuiDatePicker autoOk variant='static' openTo='date' value={date} animateYearScrolling onChange={handleOnChange} />;
};

export default React.memo(DatePicker);
