import styled from "@emotion/styled";
import type { Attendee } from "@eventsTypes";
import type { Attendees } from "@eventsTypes";
import update, { getIndexOfAttendees } from "@firebase/attendeeGenerator";
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

const Times: FC<ComponentProps> = ({
  pageIndex,
  startDate,
  endDate,
  maxCapacity,
  attendees,
  currentAttendee,
}) => {
  const dateToAttendees: Record<string, string[]> = {};
  const id = useUrlEventId();
  const eventRef = eventsDocs(id);
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ x, y, w, h }, setConfig] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [defaultSize, setDefaultSize] = useState({ w: 0, h: 0, x: 0, y: 0 });
  const [thresholdY, setThresholdY] = useState(0);
  const [currentClickedDayIndex, setCurrentClickedDayIndex] = useState(0);
  const isMobile = getIsMobile();
  useEffect(() => {
    if (containerRef.current) {
      const { x, y, width, height } =
        containerRef.current.getBoundingClientRect();
      setDefaultSize({ x, y, w: width, h: height });
    }
  }, []);

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

  const END_TIME = 24;
  const START_TIME = 8;

  const dayTimeArray = new Array(7).fill(
    new Array(END_TIME - START_TIME).fill(0).map((_, i) => i + START_TIME)
  ) as Times[];

  const isInRange = (i: number) => {
    return (
      endDate.getTime() >=
      addDateWithDays(startDate, i + pageIndex * 7).getTime()
    );
  };

  useEffect(() => {
    const moveHandler = (e: MouseEvent | TouchEvent) => {
      const { clientY } = normalizeTouchAndMouseEvent(e);
      if (
        w === 0 ||
        (clientY > defaultSize.y + defaultSize.h &&
          h === defaultSize.y + defaultSize.h - y) ||
        (clientY < defaultSize.y && h === thresholdY - defaultSize.y)
      ) {
        return;
      }
      if (clientY > thresholdY) {
        if (clientY > defaultSize.y + defaultSize.h) {
          setConfig((config) => ({
            ...config,
            h: defaultSize.y + defaultSize.h - config.y,
          }));
        } else {
          setConfig((config) => ({ ...config, h: clientY - config.y }));
        }
      } else {
        if (clientY < defaultSize.y) {
          setConfig((config) => ({
            ...config,
            h: thresholdY - defaultSize.y,
            y: defaultSize.y,
          }));
        } else {
          setConfig((config) => ({
            ...config,
            h: thresholdY - clientY,
            y: clientY,
          }));
        }
      }
    };
    if (isMobile) {
      document.addEventListener("touchmove", moveHandler);
      return () => document.removeEventListener("touchmove", moveHandler);
    }
    document.addEventListener("mousemove", moveHandler);
    return () => document.removeEventListener("mousemove", moveHandler);
  }, [thresholdY, defaultSize.y, defaultSize.h, h, y, w, isMobile]);

  useEffect(() => {
    const dragMoveHandler = () => {
      let temp = y - defaultSize.y;
      const HEIGHT = 20;
      const GAP = 1;
      let startIdx = Math.round(temp / (HEIGHT + GAP));
      let endIdx = Math.round((temp + h) / (HEIGHT + GAP)) - 1;
      const myArray = new Array(endIdx - startIdx + 1)
        .fill(0)
        .map((_, idx) =>
          addDateWithDays(
            startDate,
            currentClickedDayIndex + pageIndex * 7,
            startIdx + idx + START_TIME
          )
        );

      if (myArray.length) {
        const data = myArray.reduce((acc: Attendee[], cur) => {
          return update(acc, cur, currentAttendee);
        }, attendees);
        const index = getIndexOfAttendees(attendees, currentAttendee);
        updateDoc(eventRef, { attendees: arrayRemove(attendees[index]) });
        updateDoc(eventRef, { attendees: arrayUnion(data[0]) });
      }
      setConfig({ x: 0, y: 0, w: 0, h: 0 });
    };
    if (isMobile) {
      document.addEventListener("touchend", dragMoveHandler);
      return () => document.removeEventListener("touchend", dragMoveHandler);
    }
    document.addEventListener("mouseup", dragMoveHandler);
    return () => {
      document.removeEventListener("mouseup", dragMoveHandler);
    };
  }, [
    y,
    h,
    defaultSize.y,
    pageIndex,
    startDate,
    attendees,
    currentAttendee,
    eventRef,
    currentClickedDayIndex,
    isMobile,
  ]);
  const dargStartHandler = (e: React.TouchEvent | React.MouseEvent) => {
    const { clientY } = normalizeTouchAndMouseEvent(e.nativeEvent);
    const el = e.target as HTMLElement;
    if (el.getAttribute("id")?.includes("time") && el) {
      const { x, width, height } = el.getBoundingClientRect();
      const dayIndex = Number(el?.getAttribute("id")?.split("-")[0]);
      setCurrentClickedDayIndex(dayIndex);
      setThresholdY(clientY - height / 2);
      setConfig({
        x,
        y: clientY - height / 2,
        w: width,
        h: height / 2,
      });
    }
  };
  return (
    <Container
      ref={containerRef}
      onMouseDown={!isMobile ? dargStartHandler : undefined}
      onTouchStart={isMobile ? dargStartHandler : undefined}
    >
      {dayTimeArray.map((hours, dayIndex) => {
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
      <UpdaterBox {...{ x, y, w, h }} />
    </Container>
  );
};

export default Times;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.1rem;
  touch-action: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const UpdaterBox = styled.div<TimeProps>`
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
  height: 2rem;
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
