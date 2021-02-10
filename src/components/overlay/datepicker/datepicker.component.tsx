import React from 'react';
import ReactDatePicker from 'react-datepicker';

import { DatePickerProps } from '@components/overlay/datepicker';

const DatePicker = ({ startDate, endDate, isRange = false, onChange }: DatePickerProps) => {
	return (
		<>
			{isRange ? (
				<ReactDatePicker
					selected={startDate}
					onChange={onChange}
					startDate={startDate}
					endDate={endDate}
					selectsRange
					inline
				/>
			) : (
				<ReactDatePicker selected={startDate} onChange={onChange} />
			)}
		</>
	);
};

export default React.memo(DatePicker);
