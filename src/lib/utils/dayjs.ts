import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';

import 'dayjs/locale/en';
import 'dayjs/locale/it';

dayjs.extend(utc);
dayjs.extend(timezone);

export default (...args: Parameters<typeof dayjs>) => dayjs(...args);
