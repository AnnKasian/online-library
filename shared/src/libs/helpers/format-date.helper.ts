import { format as libraryFormat } from 'date-fns';

import { DateFormat } from '../enums';

const formatDate = (date: Date | string, format: DateFormat): string => {
  const finalDate = date instanceof Date ? date : new Date(date);

  return libraryFormat(finalDate, format);
};

export { formatDate };
