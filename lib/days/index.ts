const THREE_WEEKS_DAYS = 21;
const DAY_MILE_SECONDS = 24 * 60 * 60 * 1000;
export const getDiffDays = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays;
};

export const getDayOfWeek = (date: Date) => {
  const d = date.getDay();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return dayNames[d % 7];
};

export const secondsToDate = (seconds: number) => {
  return new Date(seconds * 1000);
};

export const addDateWithDays = (date: Date, days: number, hours = 0) => {
  return new Date(date.getTime() + days * DAY_MILE_SECONDS + hours * 1000 * 60 * 60);
};

export const dateToPattern = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const setMaxDate = (date: Date) => {
  const maxDate = addDateWithDays(date, THREE_WEEKS_DAYS - 1);
  return dateToPattern(maxDate);
};

export const getMaxDate = (s: string) => {
  if (s) {
    return setMaxDate(new Date(s));
  }
};

export const notWithinThreeWeeks = (startDate: string, endDate: string) => {
  const st = new Date(startDate).getTime();
  const et = new Date(endDate).getTime();
  return Math.abs(et - st) > (THREE_WEEKS_DAYS - 1) * DAY_MILE_SECONDS;
};
