/**
 * 생성
 */

import type { Attendees } from "@eventsTypes";
import { Timestamp } from "firebase/firestore";

//TODO refactoring, 테스트 코드 생성
const update = (attendees: Attendees, time: Date, name: string): Attendees => {
  const index = attendees.findIndex((attendee) => attendee.name === name);

  if (index === -1) {
    return [...attendees, { name, availableDates: [Timestamp.fromDate(time)] }];
  }

  const availableDates = attendees[index].availableDates;
  const dates = availableDates.map((t) => t.toDate().toString());
  let dupIndex = dates.findIndex((t) => t === time.toString());
  if (dupIndex !== -1) {
    return [
      ...attendees.slice(0, index),
      {
        name,
        availableDates: availableDates.filter((_, idx) => idx !== dupIndex),
      },
      ...attendees.slice(index + 1),
    ];
  }

  return [
    ...attendees.slice(0, index),
    { name, availableDates: [...availableDates, Timestamp.fromDate(time)] },
    ...attendees.slice(index + 1),
  ];
};

export default update;
