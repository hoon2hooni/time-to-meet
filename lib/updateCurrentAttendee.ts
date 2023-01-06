import type { Attendees } from "@eventsTypes";
import { updateCurrentAttendeeEventDocRef } from "@firebase/clientApp";

import {
  getDeletedAttendeeData,
  getIndexOfAttendees,
  getWriteAttendeeData,
} from "./dataTransformer";

export default function updateCurrentAttendee({
  attendees,
  currentAttendee,
  method,
  selectedDates,
  id,
}: {
  attendees: Attendees;
  currentAttendee: string;
  selectedDates: Date[];
  method: { type: "delete" | "write" };
  id: string;
}) {
  const currentAttendeeIndex = getIndexOfAttendees(attendees, currentAttendee);
  const methods = {
    delete: getDeletedAttendeeData,
    write: getWriteAttendeeData,
  } as const;

  const toBeUpdatedCurrentAttendeeDoc = methods[method.type](
    attendees,
    selectedDates,
    currentAttendee,
    currentAttendeeIndex
  );
  updateCurrentAttendeeEventDocRef(
    id,
    attendees,
    currentAttendeeIndex,
    toBeUpdatedCurrentAttendeeDoc
  );
}
