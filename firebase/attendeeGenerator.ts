/**
 * 생성
 */

import type { Attendees } from "@eventsTypes";
import { Timestamp } from "firebase/firestore";

//TODO refactoring, 테스트 코드 생성
const update = (attendees: Attendees, time: Date, name:string): Attendees => {
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

export const getIndexOfAttendees = (attendees: Attendees, name: string) => {
  return attendees.findIndex((attendee) => attendee.name === name);
};

export default update;
