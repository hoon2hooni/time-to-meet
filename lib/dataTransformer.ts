/**
 * 생성
 */

import type { Attendees } from "@eventsTypes";
import { Timestamp } from "firebase/firestore";

//TODO refactoring, 테스트 코드 생성
export const getWriteAttendeeData = (
  attendees: Attendees,
  dates: Date[],
  name: string,
  index: number
) => {
  if (index === -1) {
    return {
      name,
      availableDates: dates.map((time) => Timestamp.fromDate(time)),
    };
  }
  const availableDates = attendees[index].availableDates;
  const withoutDuplicatedDates = dates.filter(
    (time) => !availableDates.some((t) => isEqualDateTimesTamp(t, time))
  );

  return {
    name,
    availableDates: [...availableDates, ...withoutDuplicatedDates],
  };
};

export const getErasedAttendeeData = (
  attendees: Attendees,
  dates: Date[],
  name: string,
  index: number
) => {
  if (index === -1) {
    return { name, availableDates: [] };
  }
  const availableDates = attendees[index].availableDates;
  const afterErasedAvailableDates = availableDates.filter(
    (t) => !dates.some((time) => isEqualDateTimesTamp(t, time))
  );
  return { name, availableDates: afterErasedAvailableDates };
};

const isEqualDateTimesTamp = (t: Timestamp, b: Date) => {
  return t.isEqual(Timestamp.fromDate(b));
};

export const getIndexOfAttendees = (attendees: Attendees, name: string) => {
  return attendees.findIndex((attendee) => attendee.name === name);
};

export const generateDateToAttendees = (attendees: Attendees) => {
  const dateToAttendees: Record<string, string[]> = {};
  attendees.forEach(({ name, availableDates }) => {
    availableDates.forEach((availableDate) => {
      const date = availableDate.toDate().toISOString();
      if (dateToAttendees[date]) {
        dateToAttendees[date].push(name);
      } else {
        dateToAttendees[date] = [name];
      }
    });
  });
  return dateToAttendees;
};
