import dayjs, { Dayjs, OpUnitType } from 'dayjs';

import { EU_DATE_FORMAT_SLASHES } from '@lib/constants';

export const formatDate = ({
	date,
	timezone,
	format = EU_DATE_FORMAT_SLASHES
}: {
	date: Date | Dayjs;
	timezone?: string;
	format?: string;
}) => {
	if (timezone) {
		return dayjs(date).tz(timezone).format(format);
	}

	return dayjs(date).format(format);
};

export const isCurrentYear = (date: Date | Dayjs) => {
	if (!date) {
		return;
	}

	return dayjs(date).year() === dayjs().year();
};

/**
 * Add given unit to current date and return new date.
 * @param  {Dayjs} date?
 */
export const addUnitToCurrentDate = (value: number, unit: OpUnitType = 'day') => {
	return dayjs().add(value, unit);
};

/**
 * Get the date of the end of the week. If no argument provided, get end of week date
 * from current date.
 * @param  {Dayjs} date?
 */
export const getEndOfWeek = (date?: Dayjs) => {
	if (date) {
		return dayjs(date).endOf('week');
	}

	return dayjs().endOf('week');
};

/**
 * Get the date of the end of the month. If no argument provided, get end of month date
 * from current date.
 * @param  {Dayjs} date?
 */
export const getEndOfMonth = (date?: Dayjs) => {
	if (date) {
		return dayjs(date).endOf('month');
	}

	return dayjs().endOf('month');
};

/**
 * Get the difference between current date and the provided date argument in either
 * seconds, minutes, hours or days. If days is more than `20` then return in `DD MMM YY`
 * format.
 * @param  {Date} date
 */
export const getDifferenceWithCurrentDate = (date: Date) => {
	const difference = dayjs().diff(date);

	const { days, hours, minutes } = dhm(difference);

	const timeformat: { time?: number | string; format?: string } = {};

	if (!days && !hours && (minutes || !minutes)) {
		if (!minutes || minutes <= 2) {
			timeformat.time = 'now';

			return timeformat;
		}

		timeformat.format = 'minutes';
		timeformat.time = minutes;

		return timeformat;
	}

	if (!days && hours) {
		timeformat.format = hours > 1 ? 'hours' : 'hour';
		timeformat.time = hours;

		return timeformat;
	}

	if (days <= 20) {
		timeformat.format = days > 1 ? 'days' : 'day';
		timeformat.time = days;

		return timeformat;
	}

	timeformat.time = formatDate({
		date,
		format: 'DD MMM YY'
	});

	return timeformat;
};

const dhm = (ms: number) => {
	const days = Math.floor(ms / (24 * 60 * 60 * 1000));
	const daysms = ms % (24 * 60 * 60 * 1000);
	const hours = Math.floor(daysms / (60 * 60 * 1000));
	const hoursms = ms % (60 * 60 * 1000);
	const minutes = Math.floor(hoursms / (60 * 1000));
	const minutesms = ms % (60 * 1000);
	const sec = Math.floor(minutesms / 1000);

	return {
		sec,
		days,
		hours,
		minutes
	};
};

export const generateArrayOfYears = () => {
	const max = dayjs().year();
	const min = 1970;
	const years = [];

	for (let i = max; i >= min; i--) {
		years.push(i);
	}

	return years;
};

export const getDifference = ({
	comparisonDate,
	initialDate,
	unit = 'day',
	withDecimals = false
}: {
	comparisonDate: Date | Dayjs;
	initialDate?: Date | Dayjs;
	unit?: OpUnitType;
	withDecimals?: boolean;
}) => {
	if (initialDate) {
		return dayjs(initialDate).diff(comparisonDate, unit, withDecimals);
	}

	return dayjs().diff(comparisonDate, unit, withDecimals);
};
