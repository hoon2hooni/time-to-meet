export type NewEvent = {
  name: string;
  maxCapacity: number;
  startDate: string;
  endDate: string;
};

export type NewEventFields = keyof NewEvent;
