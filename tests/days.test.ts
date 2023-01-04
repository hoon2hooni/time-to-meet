import { addDateAndTime } from "@lib/days";

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
