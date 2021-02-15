import 'dayjs/locale/en';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import timezonePlugin from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin

dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezonePlugin);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.locale('en');

dayjs.updateLocale('en', {
	weekStart: 1
});
