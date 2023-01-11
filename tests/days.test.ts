import {
  addDateAndTime,
  getDaysDifferenceFromMonday,
  getDaysDifferenceFromSundayReverse,
} from "@lib/days";

test("test addDateWithDays", () => {
  const date = new Date("2021-01-01");

  expect(addDateAndTime(date, { days: 1 }).toISOString()).toBe(
    "2021-01-02T00:00:00.000Z"
  );

  expect(addDateAndTime(date, { days: 1, hours: 12 }).toISOString()).toBe(
    "2021-01-02T12:00:00.000Z"
  );

  expect(addDateAndTime(date, { days: 1, hours: 25 }).toISOString()).toBe(
    "2021-01-03T01:00:00.000Z"
  );
});

test("test check getDaysDifferenceFromMonday", () => {
  //수요일 2일
  expect(getDaysDifferenceFromMonday(new Date("2023-01-11"))).toBe(2);
  //일요일 6일
  expect(getDaysDifferenceFromMonday(new Date("2023-01-15"))).toBe(6);
  //월요일 0일
  expect(getDaysDifferenceFromMonday(new Date("2023-01-9"))).toBe(0);
});

test("test check getDaysDifferenceSundayReverse", () => {
  //수요일 4일
  expect(getDaysDifferenceFromSundayReverse(new Date("2023-1-11"))).toBe(4);
  //일요일 0일
  expect(getDaysDifferenceFromSundayReverse(new Date("2023-1-15"))).toBe(0);
  //월요일 6일
  expect(getDaysDifferenceFromSundayReverse(new Date("2023-1-9"))).toBe(6);
});
