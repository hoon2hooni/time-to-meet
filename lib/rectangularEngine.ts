const PADDING_X = 40;
const COLUMN_COUNT = 7;

export const getTableIndex = (width: number, clientX: number) => {
  return Math.floor((clientX - PADDING_X) / width);
};

export const getXOfTable = (gap: number, width: number, index: number) => {
  return PADDING_X + index * (gap + width);
};
