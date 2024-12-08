import { format, addDays, startOfWeek } from "date-fns";

export const formatDate = (date: Date) => format(date, "yyyy-MM-dd");
export const formatDayName = (date: Date) => format(date, "EEEE");
export const formatShortDay = (date: Date) => format(date, "EEE");
export const formatDayNumber = (date: Date) => format(date, "d");

export const getWeekDays = (date: Date) => {
  const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
};

export const isSameDay = (date1: Date, date2: Date) =>
  formatDate(date1) === formatDate(date2);
