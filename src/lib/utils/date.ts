import dayjs, { Dayjs, OpUnitType } from 'dayjs';

import { EU_DATE_FORMAT_SLASHES, SERVER_DATE_FORMAT } from '@lib/constants';

export const formatDate = ({
	date,
	timezone,
	format = EU_DATE_FORMAT_SLASHES
}: {
	date: Date | Dayjs;
	timezone?: string;
	format?: string;
}) => {
	if (!date) {
		return;
	}

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

export const addUnitToCurrentDate = (value: number, unit: OpUnitType = 'day') => {
	return dayjs().add(value, unit);
};

export const getEndOfWeek = (date?: Dayjs) => {
	if (date) {
		return dayjs(date).endOf('week');
	}

	return dayjs().endOf('week');
};

export const getEndOfMonth = (date?: Dayjs) => {
	if (date) {
		return dayjs(date).endOf('month');
	}

	return dayjs().endOf('month');
};

export const getDifferenceWithCurrentDate = (date: Date) => {
	const difference = dayjs().diff(date);

	const { days, hours, minutes } = dhm(difference);

	const timeformat: { time?: number | string; format?: string } = {};

	if (!days && !hours && minutes) {
		if (minutes <= 2) {
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
		days,
		hours,
		minutes
	};
};
