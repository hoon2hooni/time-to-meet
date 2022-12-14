import styled from "@emotion/styled";
import { Attendees } from "@eventsTypes";
import update from "@firebase/attendeeGenerator";
import { eventsDocs } from "@firebase/clientApp";
import { addDateWithDays } from "@lib/days";
import { updateDoc } from "firebase/firestore";
import { FC } from "react";
type Times = number[];
type ComponentProps = {
  startDate: Date;
  endDate: Date;
  pageIndex: number;
  memberCount: number;
  attendees: Attendees;
  currentAttendee: string;
};

type EachRowTimeProps = {
  memberCount: number;
  currentMemberCount?: number;
};

const Times: FC<ComponentProps> = ({
  pageIndex,
  startDate,
  endDate,
  memberCount,
  attendees,
  currentAttendee,
}) => {
  const dateToAttendees: Record<string, string[]> = {};
  const eventRef = eventsDocs(process.env.NEXT_PUBLIC_TEST_DOC_ID || "");

  attendees.forEach(({ name, availableDates }) => {
    availableDates.forEach((availableDate) => {
      const date = availableDate.toDate().toString();
      if (dateToAttendees[date]) {
        dateToAttendees[date].push(name);
      } else {
        dateToAttendees[date] = [name];
      }
    });
  });

  const handleClick = (i: number, hour: number) => {
    const data = update(
      attendees,
      addDateWithDays(startDate, i + pageIndex * 7, hour),
      currentAttendee
    );
    updateDoc(eventRef, { attendees: data });
  };

  const END_TIME = 24;
  const START_TIME = 8;

  const dayTimeArray = new Array(7).fill(
    new Array(END_TIME - START_TIME).fill(0).map((_, i) => i + 8)
  ) as Times[];

  const isInRange = (i: number) => {
    return (
      endDate.getTime() >=
      addDateWithDays(startDate, i + pageIndex * 7).getTime()
    );
  };
  return (
    <Container>
      {dayTimeArray.map((hours, dayIndex) => {
        if (isInRange(dayIndex)) {
          return (
            <AvailableDate key={dayIndex}>
              {hours.map((hour) => {
                const currentMemberCount =
                  dateToAttendees[
                    addDateWithDays(
                      startDate,
                      dayIndex + pageIndex * 7,
                      hour
                    ).toString()
                  ]?.length;

                return (
                  <EachRowTime
                    key={hour}
                    memberCount={memberCount}
                    currentMemberCount={currentMemberCount}
                    onClick={() => handleClick(dayIndex, hour)}
                  >
                    {dayIndex === 0 && <TimeUnit>{hour}:00</TimeUnit>}
                    {currentMemberCount}
                  </EachRowTime>
                );
              })}
            </AvailableDate>
          );
        }
        return <NotAvailableDate key={dayIndex} />;
      })}
    </Container>
  );
};

export default Times;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.2rem;
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
  top: -0.5rem;
  left: -3rem;
  font-size: 0.5rem;
  color: #585858;
`;

const EachRowTime = styled.div<EachRowTimeProps>`
  position: relative;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  color: ${(props) =>
    props.currentMemberCount
      ? props.theme.colors.white
      : props.theme.colors.primary};
  font-size: 1.5rem;
  background-color: ${(props) => {
    if (!props.currentMemberCount) {
      return props.theme.colors.white;
    }
    if (props.currentMemberCount < props.memberCount) {
      return props.theme.colors.title;
    }
    return "green";
  }};
`;
