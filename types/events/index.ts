import { Timestamp } from "firebase/firestore";

export type Events = {
  id: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  attendees: Attendees;
  memberCount: number;
};

export type Attendees = Attendee[];

export type Attendee = {
  name: string;
  availableDates: AvailableDates;
};

export type AvailableDates = Timestamp[];
