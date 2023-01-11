import styled from "@emotion/styled";
import type { Attendees } from "@eventsTypes";
import {
  generateDateToAttendees,
  getMaxNumberOfAttendees,
} from "@lib/dataTransformer";
import {
  addDateAndTime,
  getSelectedDatesWithSelectedArea,
  isInRange,
} from "@lib/days";
import {
  useMouseAndTouchEnd,
  useMouseAndTouchMoveLocation,
  useMouseAndTouchStartLocation,
} from "@lib/hooks/useMouseAndTouch";
import useResizeEvent from "@lib/hooks/useResizeEvent";
import useUrlEventId from "@lib/hooks/useUrlEventId";
import { generateSelectedArea, getTableIndex } from "@lib/tableHelper";
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
};

type EachRowTimeProps = {
  maxNumberOfAttendees: number;
  currentAttendeeCount?: number;
  hasCurrentMember: boolean;
};

interface TimeProps {
  x: number;
  y: number;
  w: number;
  h: number;
}

const initialSelectedArea = { x: 0, y: 0, w: 0, h: 0 };

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
}) => {
  const id = useUrlEventId();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSelectedAreaRef = useRef<TimeProps>(initialSelectedArea);
  const initialTableAreaRef = useRef<TimeProps>(initialSelectedArea);
  const { startClientX, startClientY, setInit } = useMouseAndTouchStartLocation(
    {
      ref: containerRef,
    }
  );
  const hasNotStartMove = startClientX === 0 && startClientY === 0;
  const currentTableIndex = useRef(0);
  const { moveClientY, setInitMove } = useMouseAndTouchMoveLocation({
    skipEvent: hasNotStartMove,
  });

  const [initialTableArea, setInitialTableArea] = useState(initialSelectedArea);
  const currentWidth = (initialTableArea.w - 1 * 6) / 7;

  currentTableIndex.current = getTableIndex(
    initialTableArea.w / 7,
    startClientX
  );

  currentSelectedAreaRef.current = generateSelectedArea(
    hasNotStartMove,
    moveClientY,
    startClientY,
    initialTableArea,
    startClientX,
    currentWidth
  );
  const resizeTimeTableHandler = () => {
    if (containerRef.current) {
      const { x, y, width, height } =
        containerRef.current.getBoundingClientRect();
      setInitialTableArea({ x, y, w: width, h: height });
      initialTableAreaRef.current = { x, y, w: width, h: height };
    }
  };

  useResizeEvent(resizeTimeTableHandler);

  const updateAttendeesAndResetSelectedArea = useCallback(() => {
    const resetSelectedArea = () => {
      setInit({ clientX: 0, clientY: 0 });
      currentSelectedAreaRef.current = initialSelectedArea;
      setInitMove({ clientX: 0, clientY: 0 });
    };

    const currentSelectedArea = currentSelectedAreaRef.current;
    if (currentSelectedArea.x === 0 && currentSelectedArea.y === 0) {
      resetSelectedArea();
      return;
    }

    const selectedDates = getSelectedDatesWithSelectedArea(
      currentSelectedArea,
      initialTableAreaRef.current,
      startDate,
      currentTableIndex.current,
      currentPageIndex
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
    setInit,
    startDate,
    currentPageIndex,
    setInitMove,
    id,
  ]);

  useMouseAndTouchEnd(updateAttendeesAndResetSelectedArea);
  const dateToAttendees = generateDateToAttendees(attendees);
  const maxNumberOfAttendees = getMaxNumberOfAttendees(dateToAttendees);
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
                    maxNumberOfAttendees={maxNumberOfAttendees}
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
      <TimesWrapper height={initialTableArea.h}>
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
    if (props.currentAttendeeCount === props.maxNumberOfAttendees) {
      return props.theme.colors.green;
    }
    if (props.hasCurrentMember) {
      return props.theme.colors.yellow;
    }

    return props.theme.colors.lightGreen;
  }};
`;
