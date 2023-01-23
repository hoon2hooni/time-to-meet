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
  startClientX: number,
  currentClientX: number
) => {
  if (hasNotStartMove) {
    return initialArea;
  }

  if (currentClientY <= startClientY && currentClientY !== 0) {
    return generateSelectedAreaWhenUserMoveUp(
      timetableArea,
      startClientX,
      currentClientY,
      startClientY,
      currentClientX
    );
  }

  return generateSelectedAreaWhenUserMoveDown(
    timetableArea,
    startClientY,
    currentClientY,
    startClientX,
    currentClientX
  );
};

const generateSelectedAreaWhenUserMoveUp = (
  timetableArea: { x: number; y: number; w: number; h: number },
  startClientX: number,
  currentClientY: number,
  startClientY: number,
  currentClientX: number
) => {
  const selectedAreaY =
    currentClientY >= timetableArea.y ? currentClientY : timetableArea.y;
  const selectedAreaHeight = startClientY - selectedAreaY;
  const { selectedAreaX, selectedAreaWidth } = getSelectedAreaWidthAndX({
    startClientX,
    currentClientX,
    timetableWidth: timetableArea.w,
  });

  return {
    x: selectedAreaX,
    y: selectedAreaY,
    w: selectedAreaWidth,
    h: selectedAreaHeight,
  };
};

const generateSelectedAreaWhenUserMoveDown = (
  timetableArea: { x: number; y: number; w: number; h: number },
  startClientY: number,
  currentClientY: number,
  startClientX: number,
  currentClientX: number
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
  const { selectedAreaX, selectedAreaWidth } = getSelectedAreaWidthAndX({
    startClientX,
    currentClientX,
    timetableWidth: timetableArea.w,
  });
  return {
    x: selectedAreaX,
    y: selectedAreaY,
    w: selectedAreaWidth,
    h: Math.max(selectedAreaHeight, minHeight),
  };
};

const getSelectedAreaX = (area: number, startClientX: number) => {
  const widthWidthGap = area / COLUMN_COUNT;
  return getXOfTable(
    1,
    getTimetableColumnAreaWidth(area),
    getColumnIndexAtTimetable(widthWidthGap, startClientX)
  );
};

export const getColumnIndexAtTimetable = (width: number, clientX: number) => {
  return Math.floor((clientX - PADDING_X) / width);
};

export const getXOfTable = (gap: number, width: number, index: number) => {
  return PADDING_X + index * (gap + width);
};

const getTimetableColumnAreaWidth = (totalWidth: number) =>
  (totalWidth - 1 * 6) / 7;

const getColumnCount = (
  유저기준: number,
  startPoint: number,
  columnWidth: number
) => {
  return Math.ceil(Math.abs(유저기준 - startPoint) / columnWidth);
};

const getSelectedAreaWidth = (
  columnCount: number,
  columnWidth: number,
  gapSize: number
) => {
  return columnCount * columnWidth + (columnCount - 1) * gapSize;
};

const getSelectedAreaWidthAndX = ({
  startClientX,
  currentClientX,
  timetableWidth,
}: {
  startClientX: number;
  currentClientX: number;
  timetableWidth: number;
}) => {
  if (currentClientX === 0) {
    const selectedAreaX = getSelectedAreaX(timetableWidth, startClientX);
    const timetableEachColumnArea = getTimetableColumnAreaWidth(timetableWidth);
    return {
      selectedAreaX,
      selectedAreaWidth: timetableEachColumnArea,
    };
  }
  if (currentClientX >= startClientX) {
    const selectedAreaX = getSelectedAreaX(timetableWidth, startClientX);
    const timetableEachColumnArea = getTimetableColumnAreaWidth(timetableWidth);
    const columnCount = getColumnCount(
      currentClientX,
      selectedAreaX,
      timetableEachColumnArea
    );
    const selectedAreaWidth = getSelectedAreaWidth(
      columnCount,
      timetableEachColumnArea,
      1
    );

    return {
      selectedAreaX,
      selectedAreaWidth,
    };
  }

  const selectedAreaX = getSelectedAreaX(timetableWidth, currentClientX);
  const timetableEachColumnArea = getTimetableColumnAreaWidth(timetableWidth);
  const columnCount = getColumnCount(
    startClientX,
    selectedAreaX,
    timetableEachColumnArea
  );
  const selectedAreaWidth = getSelectedAreaWidth(
    columnCount,
    timetableEachColumnArea,
    1
  );
  return {
    selectedAreaX,
    selectedAreaWidth,
  };
};
