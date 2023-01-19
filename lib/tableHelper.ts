const PADDING_X = 40;
const COLUMN_COUNT = 7;
const END_TIME = 24;
const START_TIME = 8;
const initialArea = { x: 0, y: 0, w: 0, h: 0 };

export const generateSelectedArea = (
  hasNotStartMove: boolean,
  currentClientY: number,
  startClientY: number,
  timetableArea: { x: number; y: number; w: number; h: number },
  startClientX: number
) => {
  if (hasNotStartMove) {
    return initialArea;
  }
  if (currentClientY <= startClientY && currentClientY !== 0) {
    return generateSelectedAreaWhenUserMoveUp(
      timetableArea,
      startClientX,
      currentClientY,
      startClientY
    );
  }

  return generateSelectedAreaWhenUserMoveDown(
    timetableArea,
    startClientY,
    currentClientY,
    startClientX
  );
};

const generateSelectedAreaWhenUserMoveUp = (
  timetableArea: { x: number; y: number; w: number; h: number },
  startClientX: number,
  currentClientY: number,
  startClientY: number
) => {
  const selectedAreaY =
    currentClientY >= timetableArea.y ? currentClientY : timetableArea.y;
  const selectedAreaHeight = startClientY - selectedAreaY;
  return {
    x: getSelectedAreaX(timetableArea.w, startClientX),
    y: selectedAreaY,
    w: getSelectedAreaWidth(timetableArea.w),
    h: selectedAreaHeight,
  };
};

const generateSelectedAreaWhenUserMoveDown = (
  timetableArea: { x: number; y: number; w: number; h: number },
  startClientY: number,
  currentClientY: number,
  startClientX: number
) => {
  const minHeight =
    (timetableArea.h - (END_TIME - START_TIME - 1)) /
    (END_TIME - START_TIME) /
    3;

  const selectedAreaY = startClientY;
  const selectedAreaHeight =
    currentClientY >= timetableArea.y + timetableArea.h
      ? timetableArea.y + timetableArea.h - selectedAreaY
      : currentClientY - startClientY;

  return {
    x: getSelectedAreaX(timetableArea.w, startClientX),
    y: selectedAreaY,
    w: getSelectedAreaWidth(timetableArea.w),
    h: Math.max(selectedAreaHeight, minHeight),
  };
};

const getSelectedAreaX = (area: number, startClientX: number) => {
  const widthWidthGap = area / COLUMN_COUNT;
  return getXOfTable(
    1,
    getSelectedAreaWidth(area),
    getColumnIndexAtTimetable(widthWidthGap, startClientX)
  );
};

export const getColumnIndexAtTimetable = (width: number, clientX: number) => {
  return Math.floor((clientX - PADDING_X) / width);
};

export const getXOfTable = (gap: number, width: number, index: number) => {
  return PADDING_X + index * (gap + width);
};

const getSelectedAreaWidth = (totalWidth: number) => (totalWidth - 1 * 6) / 7;
