export type Size = "small" | "middle" | "large";

export type RoomInfo = {
  title: string;
  memberCount: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  goal: number;
};

export type RoomInfoKeys = keyof RoomInfo;

export type InputProps = {
  id: RoomInfoKeys;
  size: Size;
  unit?: string;
  type: string;
}[];
