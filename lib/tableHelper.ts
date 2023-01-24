const PADDING_X = 40;
const COLUMN_COUNT = 7;
const END_TIME = 24;
const START_TIME = 8;
const initialArea = { x: 0, y: 0, w: 0, h: 0 };

type ClientX = {
  startClientX: number;
  currentClientX: number;
};

type ClientY = {
  startClientY: number;
  currentClientY: number;
};

type Client = ClientX & ClientY;

type Area = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type LimitClient = {
  minClientX: number;
  maxClientX: number;
};

type GenerateSelectedAreaConfig = {
  hasNotStartMove: boolean;
  client: Client;
  timetableArea: Area;
  limitClient: LimitClient;
};
type GenerateSelectedArea = (config: GenerateSelectedAreaConfig) => Area;

export const generateSelectedArea: GenerateSelectedArea = ({
  hasNotStartMove,
  client,
  timetableArea,
  limitClient,
}) => {
  const { startClientX, startClientY, currentClientX, currentClientY } = client;
  const clientX = { startClientX, currentClientX };
  const clientY = { startClientY, currentClientY };

  if (hasNotStartMove) {
    return initialArea;
  }

  const { x, w } = getXAndWidthOfSelectedArea({
    clientX,
    timetableWidth: timetableArea.w,
    limitClient,
  });
  const { y, h } = getYAndHeightOfSelectedArea(timetableArea, clientY);
  return {
    x,
    y,
    w,
    h,
  };
};

const getXAndWidthOfSelectedArea = ({
  clientX,
  timetableWidth,
  limitClient,
}: {
  clientX: ClientX;
  timetableWidth: number;
  limitClient: LimitClient;
}) => {
  const { startClientX, currentClientX } = clientX;
  const { minClientX, maxClientX } = limitClient;

  if (currentClientX === 0) {
    const selectedAreaX = getSelectedAreaX(timetableWidth, startClientX);
    const timetableEachColumnArea = getTimetableColumnAreaWidth(timetableWidth);
    return {
      x: selectedAreaX,
      w: timetableEachColumnArea,
    };
  }

  if (currentClientX >= startClientX) {
    const selectedAreaX = getSelectedAreaX(timetableWidth, startClientX);
    const timetableEachColumnArea = getTimetableColumnAreaWidth(timetableWidth);
    const columnCount = getColumnCount(
      Math.min(currentClientX, maxClientX),
      selectedAreaX,
      timetableEachColumnArea
    );
    const selectedAreaWidth = getSelectedAreaWidth(
      columnCount,
      timetableEachColumnArea,
      1
    );
    return {
      x: selectedAreaX,
      w: selectedAreaWidth,
    };
  }

  const selectedAreaX = Math.max(
    getSelectedAreaX(timetableWidth, currentClientX),
    minClientX
  );
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
    x: selectedAreaX,
    w: selectedAreaWidth,
  };
};

const getYAndHeightOfSelectedArea = (timetableArea: Area, clientY: ClientY) => {
  const { startClientY, currentClientY } = clientY;

  if (currentClientY <= startClientY && currentClientY !== 0) {
    const selectedAreaY =
      currentClientY >= timetableArea.y ? currentClientY : timetableArea.y;
    const selectedAreaHeight = startClientY - selectedAreaY;
    return {
      y: selectedAreaY,
      h: selectedAreaHeight,
    };
  }

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
    y: selectedAreaY,
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
