import { ToggleButton } from "@components/icons";
import styled from "@emotion/styled";
import type { Attendees } from "@eventsTypes";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useState } from "react";

type ComponentProps = {
  eventName: string;
  attendees: Attendees;
  currentAttendee: string;
  setAttendees: Dispatch<SetStateAction<Attendees>>;
};

const TimetableInfo: FC<ComponentProps> = ({
  eventName,
  attendees,
  currentAttendee,
  setAttendees,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const isCurrentUser = (name: string) => name === currentAttendee;
  const dateToAttendees: Record<string, string[]> = {};
  //todo 시간 구간 보이게 하는 것 구현
  let featureFlag: boolean = false;
  const sortedByAttendeesCounts = featureFlag
    ? Object.keys(dateToAttendees)
        .sort((a, b) => dateToAttendees[b].length - dateToAttendees[a].length)
        .slice(0, 3)
    : undefined;
  useEffect(() => {
    if (currentAttendee === "") return;
    setAttendees((attendees) => {
      const isExist =
        attendees.findIndex((attendee) => attendee.name === currentAttendee) !==
        -1;
      if (!isExist) {
        return [...attendees, { name: currentAttendee, availableDates: [] }];
      }
      return attendees;
    });
  }, [currentAttendee, setAttendees]);
  return (
    <CalendarInfo>
      <AttendeeHeader>{eventName} 참여자</AttendeeHeader>
      <Attendee>
        {attendees.map(({ name }) => (
          <Attender key={name} isCurrentUser={isCurrentUser(name)}>
            {name}
            {isCurrentUser(name) && "(나)"}
          </Attender>
        ))}
      </Attendee>
      {featureFlag && (
        <>
          <TextHeader>
            가장 많이 선택된 시간
            <div
              onClick={() => setIsVisible((s) => !s)}
              style={{ transform: isVisible ? "rotate(-180deg)" : "none" }}
            >
              <ToggleButton />
            </div>
          </TextHeader>
          {isVisible &&
            sortedByAttendeesCounts &&
            sortedByAttendeesCounts.map((k, i) => {
              const date = new Date(k);
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const time = date.getHours();
              return (
                <EachResult key={i}>
                  <Rank>{i + 1}위</Rank>
                  <div>{`${month}월 ${day}일 ${time}:00시~${
                    Number(time) + 1
                  }:00시`}</div>
                  <Count>{dateToAttendees[k].length}명</Count>
                </EachResult>
              );
            })}
        </>
      )}
    </CalendarInfo>
  );
};

export default TimetableInfo;

const TextHeader = styled.div`
  color: ${(props) => props.theme.colors.primary};
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AttendeeHeader = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Attendee = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  width: 20rem;
  margin-top: 1rem;
`;

const Attender = styled.div<{ isCurrentUser: boolean }>`
  margin-right: 0.5rem;
  color: ${(props) =>
    props.isCurrentUser
      ? props.theme.colors.yellow
      : props.theme.colors.primary};
  font-weight: ${(props) => (props.isCurrentUser ? 700 : 400)};
`;

const CalendarInfo = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 1rem;
  padding: 1.5rem 2rem;
`;

const EachResult = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Rank = styled.div`
  font-weight: 700;
  margin-right: 1rem;
`;

const Count = styled.div`
  margin-left: auto;
  font-weight: 700;
`;
