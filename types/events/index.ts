export type EventsDocs = {
  id: string;
  name: string;
  startDate: {
    seconds: number;
  };
  endDate: {
    seconds: number;
  };
  attendees: Attendees;
};

export type Attendees = {
  name: string;
  availableDates: AvailableDates;
}[];

export type AvailableDates = {
  seconds: number;
}[];
