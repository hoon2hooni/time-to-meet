interface TimeProps {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Time {
  days?: number;
  hours?: number;
  seconds?: number;
  minutes?: number;
}

const END_TIME = 24;
const START_TIME = 8;
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

export const getMilliSecondsFromTime = (time: Time) => {
  const SEC = 1000;
  const MIN = 60 * SEC;
  const HR = 60 * MIN;
  const D = 24 * HR;

  const { days = 0, hours = 0, seconds = 0, minutes = 0 } = time;

  return days * D + hours * HR + minutes * MIN + seconds * SEC;
};

export const addDateAndTime = (date: Date, time: Time) => {
  return new Date(date.getTime() + getMilliSecondsFromTime(time));
};

export const dateToPattern = (date: Date) => {
  return date.toISOString().split("T")[0];
};

//TODO setMaxDate, getMaxDate 리펙토링
export const setMaxDate = (date: Date) => {
  const maxDate = addDateAndTime(date, { days: THREE_WEEKS_DAYS - 1 });
  return dateToPattern(maxDate);
};

export const getMaxDate = (s: string) => {
  if (s) {
    return setMaxDate(new Date(s));
  }
};

//TODO: 순수함수로 변경
export const notWithinThreeWeeks = (startDate: string, endDate: string) => {
  const st = new Date(startDate).getTime();
  const et = new Date(endDate).getTime();
  return Math.abs(et - st) > (THREE_WEEKS_DAYS - 1) * DAY_MILE_SECONDS;
};

export const parseStringDateAndCombine = (date: string, pattern: string) => {
  const parsedDate = date.split(pattern);
  return `${parsedDate[0]}년 ${
    parsedDate[1][0] === "0" ? parsedDate[1][1] : parsedDate[1]
  }월 ${parsedDate[2][0] === "0" ? parsedDate[2][1] : parsedDate[2]}일`;
};

export function getSelectedDatesWithSelectedArea(
  selectedArea: TimeProps,
  table: TimeProps,
  startDate: Date,
  currentTableIndex: number,
  pageIndex: number
) {
  const { startIdx, endIdx } = getIndexesFromTable(selectedArea, table);
  return getSelectedDates({
    startIdx,
    endIdx,
    startDate,
    currentTableIndex,
    pageIndex,
  });
}

function getIndexesFromTable(selectedArea: TimeProps, table: TimeProps) {
  const fromTableToSelectedArea = selectedArea.y - table.y;
  const GAP = 1;
  const HEIGHT =
    (table.h - GAP * (END_TIME - START_TIME - 1)) / (END_TIME - START_TIME);

  const startIdx = Math.round(fromTableToSelectedArea / (HEIGHT + GAP));
  const endIdx =
    Math.round((fromTableToSelectedArea + selectedArea.h) / (HEIGHT + GAP)) - 1;
  return { startIdx, endIdx };
}

export function getSelectedDates({
  endIdx = 15,
  startIdx = 0,
  startDate,
  currentTableIndex,
  pageIndex,
  startTime = 8,
}: {
  endIdx?: number;
  startIdx?: number;
  startDate: Date;
  currentTableIndex: number;
  pageIndex: number;
  startTime?: number;
}) {
  if (endIdx - startIdx + 1 < 0) return [];
  const selectedDates = new Array(endIdx - startIdx + 1).fill(0).map((_, idx) =>
    addDateAndTime(startDate, {
      days: currentTableIndex + pageIndex * 7,
      hours: startIdx + idx + startTime,
    })
  );
  return selectedDates;
}

export function isInRange(
  endDate: Date,
  startDate: Date,
  pageIndex: number,
  i: number
) {
  return (
    endDate.getTime() >=
    addDateAndTime(startDate, { days: i + pageIndex * 7 }).getTime()
  );
}
