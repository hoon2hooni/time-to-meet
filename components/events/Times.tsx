import styled from "@emotion/styled";
import type { Attendee } from "@eventsTypes";
import type { Attendees } from "@eventsTypes";
import update, { getIndexOfAttendees } from "@firebase/attendeeGenerator";
import {
  getErasedAttendeeData,
  getWriteAttendeeData,
} from "@firebase/attendeeGenerator";
import { eventsDocs } from "@firebase/clientApp";
import { addDateWithDays } from "@lib/days";
import {
  getIsMobile,
  normalizeTouchAndMouseEvent,
} from "@lib/handleCrossPlatform";
import useUrlEventId from "@lib/hooks/useUrlEventId";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { arrayRemove } from "firebase/firestore";
import { FC, useEffect, useRef, useState } from "react";
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
  const [{ x, y, w, h }, setSelectedArea] = useState(initialSelectedArea);
  const thresholdRef = useRef(0);
  const selectedAreaRef = useRef({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });
  const [initialTableArea, setInitialTableArea] = useState(initialSelectedArea);
  const [currentClickedDayIndex, setCurrentClickedDayIndex] = useState(0);
  const isMobile = getIsMobile();

  const dateToAttendees: Record<string, string[]> = {};

  attendees.forEach(({ name, availableDates }) => {
    availableDates.forEach((availableDate) => {
      const date = availableDate.toDate().toISOString();
      if (dateToAttendees[date]) {
        dateToAttendees[date].push(name);
      } else {
        dateToAttendees[date] = [name];
      }
    });
  });

  const isInRange = (i: number) => {
    return (
      endDate.getTime() >=
      addDateWithDays(startDate, i + pageIndex * 7).getTime()
    );
  };

  const dargStartHandler = (e: React.TouchEvent | React.MouseEvent) => {
    const { clientY } = normalizeTouchAndMouseEvent(e.nativeEvent);
    const el = e.target as HTMLElement;
    if (el.getAttribute("id")?.includes("time") && el) {
      const { x, width, height } = el.getBoundingClientRect();
      const dayIndex = Number(el?.getAttribute("id")?.split("-")[0]);
      setCurrentClickedDayIndex(dayIndex);
      thresholdRef.current = clientY - height / 2;
      selectedAreaRef.current = {
        x,
        y: clientY - height / 2,
        w: width,
        h: height / 2,
      };
      setSelectedArea({
        x,
        y: clientY - height / 2,
        w: width,
        h: height / 2,
      });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const { x, y, width, height } =
        containerRef.current.getBoundingClientRect();
      setInitialTableArea({ x, y, w: width, h: height });
    }
  }, []);

  useEffect(() => {
    const dragMoveHandler = (e: MouseEvent | TouchEvent) => {
      const { clientY } = normalizeTouchAndMouseEvent(e);
      const isNotSelected = selectedAreaRef.current.w === 0;

      const doesMoveBelowTable =
        clientY > initialTableArea.y + initialTableArea.h;
      const doesMoveAboveTable = clientY < initialTableArea.y;

      const doesMoveDirectionDown = clientY > thresholdRef.current;

      const upperLimitAreaDownSide =
        initialTableArea.y + initialTableArea.h - selectedAreaRef.current.y;

      const upperLimitAreaUpSide = thresholdRef.current - initialTableArea.y;

      const isAlreadyMeetLimitDownSide =
        selectedAreaRef.current.h === upperLimitAreaDownSide;

      const doseMoveDirectionUp = clientY < initialTableArea.y;

      const selectedAreaDownSide = clientY - selectedAreaRef.current.y;
      const selectedAreaUpSide = thresholdRef.current - clientY;

      const isAlreadyMeetLimitUpSide =
        selectedAreaRef.current.h === thresholdRef.current - initialTableArea.y;

      if (
        isNotSelected ||
        (doesMoveBelowTable && isAlreadyMeetLimitDownSide) ||
        (doseMoveDirectionUp && isAlreadyMeetLimitUpSide)
      ) {
        return;
      }

      if (doesMoveDirectionDown && doesMoveBelowTable) {
        selectedAreaRef.current.h = upperLimitAreaDownSide;
        setSelectedArea((area) => ({
          ...area,
          h: upperLimitAreaDownSide,
        }));
        return;
      }

      if (doesMoveDirectionDown) {
        selectedAreaRef.current.h = selectedAreaDownSide;
        setSelectedArea((area) => ({ ...area, h: selectedAreaDownSide }));
        return;
      }

      if (doesMoveAboveTable) {
        selectedAreaRef.current.h = upperLimitAreaUpSide;
        selectedAreaRef.current.y = initialTableArea.y;
        setSelectedArea((area) => ({
          ...area,
          h: upperLimitAreaUpSide,
          y: initialTableArea.y,
        }));
        return;
      }

      selectedAreaRef.current.h = selectedAreaUpSide;
      selectedAreaRef.current.y = clientY;
      setSelectedArea((config) => ({
        ...config,
        h: thresholdRef.current - clientY,
        y: clientY,
      }));
    };

    if (isMobile) {
      document.addEventListener("touchmove", dragMoveHandler);
      return () => document.removeEventListener("touchmove", dragMoveHandler);
    }

    document.addEventListener("mousemove", dragMoveHandler);
    return () => document.removeEventListener("mousemove", dragMoveHandler);
  }, [initialTableArea.y, initialTableArea.h, isMobile]);

  useEffect(() => {
    const writeSelectedArea = (dates: Date[], index: number) => {
      const data = getWriteAttendeeData(
        attendees,
        dates,
        currentAttendee,
        index
      );
      return data;
    };

    const eraseSelectedArea = (dates: Date[], index: number) => {
      const data = getErasedAttendeeData(
        attendees,
        dates,
        currentAttendee,
        index
      );
      return data;
    };

    const dragDoneHandler = () => {
      if (selectedAreaRef.current.w === 0 || selectedAreaRef.current.h === 0) {
        return;
      }
      const fromTableToSelectedArea =
        selectedAreaRef.current.y - initialTableArea.y;
      const GAP = 1;
      const HEIGHT =
        (initialTableArea.h - GAP * (END_TIME - START_TIME - 1)) /
        (END_TIME - START_TIME);

      const startIdx = Math.round(fromTableToSelectedArea / (HEIGHT + GAP));
      const endIdx =
        Math.round(
          (fromTableToSelectedArea + selectedAreaRef.current.h) / (HEIGHT + GAP)
        ) - 1;

      const selectedDates = new Array(endIdx - startIdx + 1)
        .fill(0)
        .map((_, idx) =>
          addDateWithDays(
            startDate,
            currentClickedDayIndex + pageIndex * 7,
            startIdx + idx + START_TIME
          )
        );
      if (!selectedDates.length) {
        return;
      }
      const index = getIndexOfAttendees(attendees, currentAttendee);
      const data = isEraseMode
        ? eraseSelectedArea(selectedDates, index)
        : writeSelectedArea(selectedDates, index);

      if (index !== -1) {
        updateDoc(eventRef, { attendees: arrayRemove(attendees[index]) });
      }
      updateDoc(eventRef, { attendees: arrayUnion(data[0]) });
      setSelectedArea(initialSelectedArea);
      selectedAreaRef.current = initialSelectedArea;
    };

    if (isMobile) {
      document.addEventListener("touchend", dragDoneHandler);
      return () => document.removeEventListener("touchend", dragDoneHandler);
    }

    document.addEventListener("mouseup", dragDoneHandler);
    return () => {
      document.removeEventListener("mouseup", dragDoneHandler);
    };
  }, [
    initialTableArea.y,
    pageIndex,
    startDate,
    attendees,
    currentAttendee,
    eventRef,
    currentClickedDayIndex,
    isMobile,
    initialTableArea.h,
    isEraseMode,
  ]);

  return (
    <Container
      ref={containerRef}
      onMouseDown={!isMobile ? dargStartHandler : undefined}
      onTouchStart={isMobile ? dargStartHandler : undefined}
    >
      {DAY_TIME_ARRAY.map((hours, dayIndex) => {
        if (isInRange(dayIndex)) {
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
      <SelectedAreaBox
        {...{
          x,
          y,
          w,
          h,
        }}
      />
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
  top: -0.1rem;
  left: -3.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
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
