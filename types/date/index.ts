/**
 * we use number instead of Digit because of ts2590 error
 * "Expression produces a union type that is too complex to represent. ts(2590)
 *
 * type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
 */
type FourNumbers = `${number}${number}${number}${number}`;
type ThreeNumbers = `${number}${number}${number}`;
type TwoNumbers = `${number}${number}`;

type Time =
  | "year"
  | "month"
  | "hour"
  | "day"
  | "minutes"
  | "seconds"
  | "milliseconds";

type getTimeFormat<T extends Time> = T extends "year"
  ? FourNumbers
  : T extends "milliseconds"
  ? ThreeNumbers
  : TwoNumbers;

/**
 * `2021-01-08`
 */
export type DateISODate =
  `${getTimeFormat<"year">}-${getTimeFormat<"month">}-${getTimeFormat<"day">}`;

/**
 * `14:42:34.678`
 */
export type DateISOTime =
  `${getTimeFormat<"hour">}:${getTimeFormat<"minutes">}:${getTimeFormat<"seconds">}.${getTimeFormat<"milliseconds">}`;

/**
 *  `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 */
export type DateISO = `${DateISODate}T${DateISOTime}Z`;
