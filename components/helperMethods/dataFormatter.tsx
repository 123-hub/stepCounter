import { format, startOfISOWeek, endOfISOWeek, setISOWeek } from 'date-fns';

/**
 * Formats a daily date in 'YYYY-MM-DD' format to 'dd MMM'.
 * Example: '2024-09-10' → '10 SEP'
 * @param {string} dateString - The date string in 'YYYY-MM-DD' format.
 * @returns {string} The formatted date.
 */
export const formatDailyDate = (dateString:string) => {
  return format(new Date(dateString), 'dd MMM');
};

/**
 * Formats a weekly date in 'YYYY-Wxx' format to 'dd MMM - dd MMM'.
 * Example: '2024-W37' → '09 SEP - 15 SEP'
 * @param {string} weekString - The week string in 'YYYY-Wxx' format.
 * @returns {string} The formatted week range.
 */
export const formatWeeklyDate = (weekString:string) => {
  const [year, week] = weekString.split('-W').map(Number);
  const date = setISOWeek(new Date(year, 0, 1), week);
  const weekStart = startOfISOWeek(date);
  const weekEnd = endOfISOWeek(date);
  return `${format(weekStart, 'dd MMM')} - ${format(weekEnd, 'dd MMM')}`;
};

/**
 * Formats a monthly date in 'YYYY-MM' format to 'MMM'.
 * Example: '2024-09' → 'SEP'
 * @param {string} monthString - The month string in 'YYYY-MM' format.
 * @returns {string} The formatted month.
 */
export const formatMonthlyDate = (monthString:string) => {
  return format(new Date(monthString), 'MMM');
};

// Example usage:

// Daily date format
console.log(formatDailyDate('2024-09-10')); // '10 SEP'

// Weekly date format
console.log(formatWeeklyDate('2024-W37')); // '09 SEP - 15 SEP'

// Monthly date format
console.log(formatMonthlyDate('2024-09')); // 'SEP'
