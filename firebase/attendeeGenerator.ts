/**
 * 생성
 */

import type { Attendees } from "@eventsTypes";
import { Timestamp } from "firebase/firestore";

//TODO refactoring, 테스트 코드 생성
const update = (attendees: Attendees, time: Date, name: string): Attendees => {
  const index = getIndexOfAttendees(attendees, name);
  const availableDates = attendees[index].availableDates;
  const dates = availableDates.map((t) => t.toDate().toString());
  let dupIndex = dates.findIndex((t) => t === time.toString());
  if (dupIndex !== -1) {
    return [
      {
        name,
        availableDates: availableDates.filter((_, idx) => idx !== dupIndex),
      },
    ];
  }

  return [
    { name, availableDates: [...availableDates, Timestamp.fromDate(time)] },
  ];
};

export const getWriteAttendeeData = (
  attendees: Attendees,
  dates: Date[],
  name: string,
  index: number
) => {
  if (index === -1) {
    return [
      { name, availableDates: dates.map((time) => Timestamp.fromDate(time)) },
    ];
  }
  const availableDates = attendees[index].availableDates;
  const withoutDuplicatedDates = dates.filter(
    (time) => !availableDates.some((t) => isEqualDateTimesTamp(t, time))
  );

  return [
    { name, availableDates: [...availableDates, ...withoutDuplicatedDates] },
  ];
};

export const getErasedAttendeeData = (
  attendees: Attendees,
  dates: Date[],
  name: string,
  index: number
) => {
  if (index === -1) {
    return [{ name, availableDates: [] }];
  }
  const availableDates = attendees[index].availableDates;
  const afterErasedAvailableDates = availableDates.filter(
    (t) => !dates.some((time) => isEqualDateTimesTamp(t, time))
  );
  return [{ name, availableDates: afterErasedAvailableDates }];
};

const isEqualDateTimesTamp = (t: Timestamp, b: Date) => {
  return t.isEqual(Timestamp.fromDate(b));
};

export const getIndexOfAttendees = (attendees: Attendees, name: string) => {
  return attendees.findIndex((attendee) => attendee.name === name);
};

export const writeSelectedArea = (
  dates: Date[],
  index: number,
  attendees: Attendees,
  currentAttendee: string
) => {
  const data = getWriteAttendeeData(attendees, dates, currentAttendee, index);
  return data[0];
};


export const eraseSelectedArea = (
  dates: Date[],
  index: number,
  attendees: Attendees,
  currentAttendee: string
) => {
  const data = getErasedAttendeeData(attendees, dates, currentAttendee, index);
  return data[0];
};


export default update;
