import type { InputProps } from "@customTypes";

export const dateInputData: InputProps = [
  { id: "startDate", size: "middle", unit: "부터", type: "date" },
  { id: "endDate", size: "middle", unit: "까지", type: "date" },
];

export const timeInputData: InputProps = [
  { id: "startTime", size: "small", unit: "시 부터", type: "time" },
  { id: "endTime", size: "small", unit: "시 까지", type: "time" },
];
