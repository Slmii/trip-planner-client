import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';
import { PreparationFragment } from '@generated/graphql';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = ({ date, timezone, format = 'DD-MM-YYY' }: { date: Date; timezone?: string; format?: string }) => {
	if (timezone) {
		return dayjs(date).tz(timezone).format(format);
	}

	return dayjs(date).format(format);
};

export const calculatePreperationCompletionPercentage = (preparations: PreparationFragment[]) => {
	return Math.round((preparations.filter(preparation => preparation.status).length / preparations.length) * 100);
};
