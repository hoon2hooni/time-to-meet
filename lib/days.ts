import { getTimetableColumnAreaWidth } from "./tableHelper";
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

export const getDaysDifferenceFromMonday = (date: Date) => {
  return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
};

export const getDaysDifferenceFromSundayReverse = (date: Date) => {
  return Math.abs(date.getDay() - 7) % 7;
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

export const subtractDateAndTime = (date: Date, time: Time) => {
  return new Date(date.getTime() - getMilliSecondsFromTime(time));
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
  pageIndex: number
) {
  const { startXIndex, endXIndex } = getXIndexesFromTable(selectedArea, table);
  const { startYIndex, endYIndex } = getYIndexesFromTable(selectedArea, table);

  return getSelectedDates({
    pageIndex,
    startDate,
    startXIndex,
    endXIndex,
    startYIndex,
    endYIndex,
  });
}

function getXIndexesFromTable(selectedArea: TimeProps, timetable: TimeProps) {
  const GAP_SIZE = 1;

  const { x: selectedAreaX, w: selectedAreaWidth } = selectedArea;
  const { x: timetableX, w: timetableWidth } = timetable;

  const columnWidth = getTimetableColumnAreaWidth(timetableWidth);

  let startXIndex = 0;
  for (let index = 0; index < 7; index++) {
    const eachColumnXByIndex =
      timetableX + columnWidth * index + GAP_SIZE * index;
    //해당 인덱스의 컬럼의 x좌표와 선택영역의 x좌표가 소수점으로인해 다를수 있기에 반올림했음
    if (Math.round(selectedAreaX - eachColumnXByIndex) === 0) {
      startXIndex = index;
      break;
    }
  }

  const endXIndex =
    Math.round(selectedAreaWidth / columnWidth) + startXIndex - 1;

  return { startXIndex, endXIndex };
}

function getYIndexesFromTable(selectedArea: TimeProps, table: TimeProps) {
  const fromTableToSelectedArea = selectedArea.y - table.y;
  const GAP = 1;
  const HEIGHT =
    (table.h - GAP * (END_TIME - START_TIME - 1)) / (END_TIME - START_TIME);

  const startYIndex = Math.round(fromTableToSelectedArea / (HEIGHT + GAP));
  const endYIndex =
    Math.round((fromTableToSelectedArea + selectedArea.h) / (HEIGHT + GAP)) - 1;
  return { startYIndex, endYIndex };
}

export function getSelectedDates({
  pageIndex,
  startDate,
  startXIndex,
  endXIndex,
  startYIndex,
  endYIndex,
  startTime = 8,
}: {
  pageIndex: number;
  startDate: Date;
  startXIndex: number;
  endXIndex: number;
  startYIndex: number;
  endYIndex: number;
  startTime?: number;
}) {
  if (endYIndex - startYIndex + 1 < 0) return [];
  let selectedDates: Date[] = [];
  for (let startIndex = startXIndex; startIndex <= endXIndex; startIndex++) {
    selectedDates = selectedDates.concat(
      new Array(endYIndex - startYIndex + 1).fill(0).map((_, idx) =>
        addDateAndTime(startDate, {
          days: startIndex + pageIndex * 7,
          hours: startYIndex + idx + startTime,
        })
      )
    );
  }
  return selectedDates;
}

export function isInRange(
  endDate: Date,
  startWeekOfMonday: Date,
  pageIndex: number,
  i: number,
  startDate = startWeekOfMonday
) {
  return (
    endDate.getTime() >=
      addDateAndTime(startWeekOfMonday, {
        days: i + pageIndex * 7,
      }).getTime() &&
    addDateAndTime(startWeekOfMonday, { days: i + pageIndex * 7 }).getTime() >=
      startDate.getTime()
  );
}
