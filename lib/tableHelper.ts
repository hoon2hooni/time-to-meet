const PADDING_X = 40;
const COLUMN_COUNT = 7;
const END_TIME = 24;
const START_TIME = 8;
const initialSelectedArea = { x: 0, y: 0, w: 0, h: 0 };

export const generateSelectedArea = (
  hasNotStartMove: boolean,
  moveClientY: number,
  startClientY: number,
  initialTableArea: { x: number; y: number; w: number; h: number },
  startClientX: number,
  currentWidth: number
) => {
  if (hasNotStartMove) {
    return initialSelectedArea;
  }

  if (moveClientY <= startClientY && moveClientY !== 0) {
    return generateSelectedAreaUpperSide(
      initialTableArea,
      startClientX,
      moveClientY,
      startClientY
    );
  }

  return generateSelectedAreaBelow(
    initialTableArea,
    startClientY,
    currentWidth,
    moveClientY,
    getCurrentX(initialTableArea.w, startClientX)
  );
};

const generateSelectedAreaUpperSide = (
  initialTableArea: { x: number; y: number; w: number; h: number },
  startClientX: number,
  moveClientY: number,
  startClientY: number
) => {
  const currentY =
    moveClientY >= initialTableArea.y ? moveClientY : initialTableArea.y;
  const currentH = startClientY - currentY;
  return {
    x: getCurrentX(initialTableArea.w, startClientX),
    y: currentY,
    w: getCurrentColumnWidth(initialTableArea.w),
    h: currentH,
  };
};

const generateSelectedAreaBelow = (
  initialTableArea: { x: number; y: number; w: number; h: number },
  startClientY: number,
  currentWidth: number,
  moveClientY: number,
  currentX: number
) => {
  const startHeight =
    (initialTableArea.h - (END_TIME - START_TIME - 1)) /
    (END_TIME - START_TIME) /
    3;

  const currentY = startClientY;
  const currentW = currentWidth;
  const currentH =
    moveClientY >= initialTableArea.y + initialTableArea.h
      ? initialTableArea.y + initialTableArea.h - currentY
      : moveClientY - startClientY;

  return {
    x: currentX,
    y: currentY,
    w: currentW,
    h: Math.max(currentH, startHeight),
  };
};

const getCurrentX = (area: number, startClientX: number) => {
  const widthWidthGap = area / COLUMN_COUNT;
  const tableIndex = getTableIndex(widthWidthGap, startClientX);
  return getXOfTable(1, getCurrentColumnWidth(area), tableIndex);
};


export const getTableIndex = (width: number, clientX: number) => {
  return Math.floor((clientX - PADDING_X) / width);
};


export const getXOfTable = (gap: number, width: number, index: number) => {
  return PADDING_X + index * (gap + width);
};


const getCurrentColumnWidth = (totalWidth: number) => (totalWidth - 1 * 6) / 7;
