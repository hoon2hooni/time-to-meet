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

export const addDateWithDays = (date: Date, days: number) => {
  return new Date(date.getTime() + days * 1000 * 60 * 60 * 24);
};

export default secondsToDate;
