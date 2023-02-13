import styled from "@emotion/styled";
import type { Attendees } from "@eventsTypes";
import { generateDateToAttendees } from "@lib/dataTransformer";
import {
  addDateAndTime,
  getSelectedDatesWithSelectedArea,
  isInRange,
} from "@lib/days";
import useDelay from "@lib/hooks/useDelay";
import {
  useMouseAndTouchEnd,
  useMouseAndTouchMoveLocation,
  useMouseAndTouchStartLocation,
} from "@lib/hooks/useMouseAndTouch";
import useResizeEvent from "@lib/hooks/useResizeEvent";
import useUrlEventId from "@lib/hooks/useUrlEventId";
import {
  generateSelectedArea,
  getColumnIndexAtTimetable,
  getXOfTable,
} from "@lib/tableHelper";
import updateCurrentAttendee from "@lib/updateCurrentAttendee";
import { FC, useCallback, useRef, useState } from "react";

type ComponentProps = {
  startDate: Date;
  endDate: Date;
  currentPageIndex: number;
  attendees: Attendees;
  currentAttendee: string;
  isEraseMode: boolean;
  startWeekOfMonday: Date;
  endWeekOfSunday: Date;
  maxCapacity: number;
};

type EachRowTimeProps = {
  maxCapacity: number;
  currentAttendeeCount?: number;
  hasCurrentMember: boolean;
};

interface TimeProps {
  x: number;
  y: number;
  w: number;
  h: number;
}

const initialArea = { x: 0, y: 0, w: 0, h: 0 };

const END_TIME = 24;
const START_TIME = 8;

const DAY_TIME_ARRAY = new Array(7).fill(
  new Array(END_TIME - START_TIME).fill(0).map((_, i) => i + START_TIME)
) as number[][];

const Timetable: FC<ComponentProps> = ({
  currentPageIndex,
  startDate,
  endDate,
  attendees,
  currentAttendee,
  isEraseMode,
  startWeekOfMonday,
  maxCapacity,
}) => {
  /**
   * 유저가 접속을 했을때 바로 입력이 되는것을 막아주는 delay입니다.
   */
  const isUserReady = useDelay(500, currentAttendee);
  const id = useUrlEventId();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSelectedAreaRef = useRef<TimeProps>(initialArea);
  const timetableAreaRef = useRef<TimeProps>(initialArea);
  const { startClientX, startClientY, initializeMouseAndTouchStart } =
    useMouseAndTouchStartLocation({
      ref: containerRef,
      skipEvent: !isUserReady,
    });
  const hasNotStartMove = startClientX === 0 && startClientY === 0;
  const columnIndexOfSelectedAreaRef = useRef(0);
  const { moveClientX, moveClientY, initializeMouseAndTouchMove } =
    useMouseAndTouchMoveLocation({
      skipEvent: hasNotStartMove,
    });

  const [timetableArea, setTimetableArea] = useState(initialArea);

  columnIndexOfSelectedAreaRef.current = getColumnIndexAtTimetable(
    timetableArea.w / 7,
    startClientX
  );

  const availableIndexAtTable = new Array(7)
    .fill(0)
    .map((_, i) =>
      isInRange(endDate, startWeekOfMonday, currentPageIndex, i, startDate)
    );
  const startDayIndex = availableIndexAtTable.findIndex((v) => v);
  const endDayIndex = 6 - availableIndexAtTable.reverse().findIndex((v) => v);
  const minClientX = getXOfTable(1, timetableArea.w / 7, startDayIndex) - 1;
  const maxClientX = getXOfTable(1, timetableArea.w / 7, endDayIndex);
  const client = {
    startClientX,
    startClientY,
    currentClientX: moveClientX,
    currentClientY: moveClientY,
  };
  const limitClient = { minClientX, maxClientX };
  currentSelectedAreaRef.current = generateSelectedArea({
    hasNotStartMove,
    client,
    limitClient,
    timetableArea,
  });

  const resizeTimeTableHandler = () => {
    if (containerRef.current) {
      const { x, y, width, height } =
        containerRef.current.getBoundingClientRect();
      setTimetableArea({ x, y, w: width, h: height });
      timetableAreaRef.current = { x, y, w: width, h: height };
    }
  };

  useResizeEvent(resizeTimeTableHandler);

  const updateAttendeesAndResetSelectedArea = useCallback(() => {
    const resetSelectedArea = () => {
      initializeMouseAndTouchStart();
      initializeMouseAndTouchMove();
      currentSelectedAreaRef.current = initialArea;
    };

    const currentSelectedArea = currentSelectedAreaRef.current;
    if (currentSelectedArea.x === 0 && currentSelectedArea.y === 0) {
      resetSelectedArea();
      return;
    }

    const selectedDates = getSelectedDatesWithSelectedArea(
      currentSelectedArea,
      timetableAreaRef.current,
      startDate,
      columnIndexOfSelectedAreaRef.current
    );

    if (!selectedDates.length) {
      resetSelectedArea();
      return;
    }

    const method = {
      type: isEraseMode ? "delete" : "write",
    } as const;
    updateCurrentAttendee({
      attendees,
      currentAttendee,
      method,
      selectedDates,
      id,
    });
    resetSelectedArea();
  }, [
    attendees,
    currentAttendee,
    isEraseMode,
    startDate,
    initializeMouseAndTouchMove,
    initializeMouseAndTouchStart,
    id,
  ]);

  useMouseAndTouchEnd(updateAttendeesAndResetSelectedArea);
  const dateToAttendees = generateDateToAttendees(attendees);

  return (
    <Container ref={containerRef}>
      {DAY_TIME_ARRAY.map((hours, dayIndex) => {
        if (
          isInRange(
            endDate,
            startWeekOfMonday,
            currentPageIndex,
            dayIndex,
            startDate
          )
        ) {
          return (
            <AvailableDate key={dayIndex}>
              {hours.map((hours) => {
                const currentAttendeeCount =
                  dateToAttendees[
                    addDateAndTime(startDate, {
                      days: dayIndex + currentPageIndex * 7,
                      hours,
                    }).toISOString()
                  ]?.length;
                return (
                  <EachRowTime
                    key={hours}
                    maxCapacity={maxCapacity}
                    currentAttendeeCount={currentAttendeeCount}
                    id={`${dayIndex}-${hours}-time`}
                    hasCurrentMember={
                      !!dateToAttendees[
                        addDateAndTime(startDate, {
                          days: dayIndex + currentPageIndex * 7,
                          hours,
                        }).toISOString()
                      ]?.includes(currentAttendee)
                    }
                  >
                    {currentAttendeeCount}
                  </EachRowTime>
                );
              })}
            </AvailableDate>
          );
        }
        return (
          <NotAvailableDate
            key={dayIndex}
            onMouseDownCapture={(e) => {
              e.stopPropagation();
            }}
            onTouchStartCapture={(e) => {
              e.stopPropagation();
            }}
          />
        );
      })}
      <TimesWrapper height={timetableArea.h}>
        {DAY_TIME_ARRAY[0].map((hour) => (
          <TimeUnit key={hour}>{hour}:00</TimeUnit>
        ))}
      </TimesWrapper>
      <SelectedAreaBox {...currentSelectedAreaRef.current} />
    </Container>
  );
};

export default Timetable;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.1rem;
  flex: 1;
  cursor: pointer;
  position: relative;
`;
const SelectedAreaBox = styled.div<TimeProps>`
  position: fixed;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  height: ${(props) => props.h}px;
  width: ${(props) => props.w}px;
  background-color: ${(props) => props.theme.colors.yellow};
  z-index: 100;
  opacity: 0.8;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 0.2rem;
`;

const AvailableDate = styled.div`
  border-radius: 0.3rem;
  display: grid;
  grid-template-rows: repeat(16, 1fr);
  gap: 0.2rem;
`;

const NotAvailableDate = styled.div`
  background-color: ${(props) => props.theme.colors.block};
`;
const TimesWrapper = styled.div<{ height: number }>`
  border-radius: 0.3rem;
  display: grid;
  grid-template-rows: repeat(16, 1fr);
  gap: 0.2rem;
  position: absolute;
  top: 0px;
  left: 0px;
  height: ${(props) => props.height}px;
`;

const TimeUnit = styled.div`
  top: -0rem;
  left: -3.2rem;
  font-size: 1rem;
  color: #3e3e3e;
  width: 2.5rem;
  text-align: right;
  font-weight: 400;
  position: relative;
`;

const EachRowTime = styled.div<EachRowTimeProps>`
  font-weight: 700;
  position: relative;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.3rem;
  font-size: 1.5rem;
  background-color: ${(props) => {
    if (!props.currentAttendeeCount) {
      return props.theme.colors.white;
    }
    if (props.currentAttendeeCount === props.maxCapacity) {
      return props.theme.colors.green;
    }
    if (props.hasCurrentMember) {
      return props.theme.colors.yellow;
    }

    return props.theme.colors.lightGreen;
  }};
`;
