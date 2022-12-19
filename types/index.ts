export type Size = "small" | "middle" | "large";

export type NewEvent = {
  name: string;
  maxCapacity: number;
  startDate: string;
  endDate: string;
};

export type NewEventFields = keyof NewEvent;

export type InputProps = {
  id: NewEventFields;
  size: Size;
  unit?: string;
  type: string;
}[];
