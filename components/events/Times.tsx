import styled from "@emotion/styled";
import type { Attendees } from "@eventsTypes";
import { eventsDocs } from "@firebase/clientApp";
import {
  generateDateToAttendees,
  getErasedAttendeeData,
  getIndexOfAttendees,
  getWriteAttendeeData,
} from "@lib/dataTransformer";
import { addDateWithDays, getSelectedDates, isInRange } from "@lib/days";
import useMoveStart, { useMoveDone, useMoving } from "@lib/hooks/useMoveStart";
import useResizeEvent from "@lib/hooks/useResizeEvent";
import useUrlEventId from "@lib/hooks/useUrlEventId";
import { generateSelectedArea, getTableIndex } from "@lib/tableHelper";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { arrayRemove } from "firebase/firestore";
import { FC, useCallback, useRef, useState } from "react";
type Times = number[];
type ComponentProps = {
  startDate: Date;
  endDate: Date;
  pageIndex: number;
  maxCapacity: number;
  attendees: Attendees;
  currentAttendee: string;
  isEraseMode: boolean;
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

const initialSelectedArea = { x: 0, y: 0, w: 0, h: 0 };

const END_TIME = 24;
const START_TIME = 8;

const DAY_TIME_ARRAY = new Array(7).fill(
  new Array(END_TIME - START_TIME).fill(0).map((_, i) => i + START_TIME)
) as Times[];

const Times: FC<ComponentProps> = ({
  pageIndex,
  startDate,
  endDate,
  maxCapacity,
  attendees,
  currentAttendee,
  isEraseMode,
}) => {
  const id = useUrlEventId();
  const eventRef = eventsDocs(id);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSelectedAreaRef = useRef<TimeProps>(initialSelectedArea);
  const initialTableAreaRef = useRef<TimeProps>(initialSelectedArea);
  const { startClientX, startClientY, setInit } = useMoveStart({
    ref: containerRef,
  });
  const hasNotStartMove = startClientX === 0 && startClientY === 0;
  const currentTableIndex = useRef(0);
  const { moveClientY, setInitMove } = useMoving({
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

    const selectedDates = getSelectedDates(
      currentSelectedArea,
      initialTableAreaRef.current,
      startDate,
      currentTableIndex.current,
      pageIndex
    );

    if (!selectedDates.length) {
      resetSelectedArea();
      return;
    }

    const currentAttendeeIndex = getIndexOfAttendees(
      attendees,
      currentAttendee
    );
    const toBeUpdatedCurrentAttendeeDoc = isEraseMode
      ? getErasedAttendeeData(
          attendees,
          selectedDates,
          currentAttendee,
          currentAttendeeIndex
        )
      : getWriteAttendeeData(
          attendees,
          selectedDates,
          currentAttendee,
          currentAttendeeIndex
        );

    if (currentAttendeeIndex !== -1) {
      updateDoc(eventRef, {
        attendees: arrayRemove(attendees[currentAttendeeIndex]),
      });
    }
    updateDoc(eventRef, {
      attendees: arrayUnion(toBeUpdatedCurrentAttendeeDoc),
    });
    resetSelectedArea();
  }, [
    attendees,
    currentAttendee,
    isEraseMode,
    setInit,
    startDate,
    pageIndex,
    eventRef,
    setInitMove,
  ]);

  useMoveDone(updateAttendeesAndResetSelectedArea);
  const dateToAttendees = generateDateToAttendees(attendees);
  return (
    <Container ref={containerRef}>
      {DAY_TIME_ARRAY.map((hours, dayIndex) => {
        if (isInRange(endDate, startDate, pageIndex, dayIndex)) {
          return (
            <AvailableDate key={dayIndex}>
              {hours.map((hour) => {
                const currentAttendeeCount =
                  dateToAttendees[
                    addDateWithDays(
                      startDate,
                      dayIndex + pageIndex * 7,
                      hour
                    ).toISOString()
                  ]?.length;
                return (
                  <EachRowTime
                    key={hour}
                    maxCapacity={maxCapacity}
                    currentAttendeeCount={currentAttendeeCount}
                    id={`${dayIndex}-${hour}-time`}
                    hasCurrentMember={
                      !!dateToAttendees[
                        addDateWithDays(
                          startDate,
                          dayIndex + pageIndex * 7,
                          hour
                        ).toISOString()
                      ]?.includes(currentAttendee)
                    }
                  >
                    {dayIndex === 0 && <TimeUnit>{hour}:00</TimeUnit>}
                    {currentAttendeeCount}
                  </EachRowTime>
                );
              })}
            </AvailableDate>
          );
        }
        return <NotAvailableDate key={dayIndex} />;
      })}
      <SelectedAreaBox {...currentSelectedAreaRef.current} />
    </Container>
  );
};

export default Times;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.1rem;
  flex: 1;
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
  background-color: ${(props) => props.theme.colors.block}};
`;

const TimeUnit = styled.div`
  position: absolute;
  top: -0rem;
  left: -3.3rem;
  font-size: 1rem;
  color: #3e3e3e;
  width: 2.5rem;
  text-align: right;
  font-weight: 400;
`;

const EachRowTime = styled.div<EachRowTimeProps>`
  font-weight: 700;
  position: relative;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${(props) => {
    if (props.hasCurrentMember) {
      return props.theme.colors.white;
    }
    return props.theme.colors.primary;
  }};
  border-radius: 0.3rem;
  font-size: 1.5rem;
  background-color: ${(props) => {
    if (props.currentAttendeeCount === props.maxCapacity) {
      return props.theme.colors.green;
    }
    if (props.hasCurrentMember) {
      return props.theme.colors.yellow;
    }
    return props.theme.colors.white;
  }};
`;
