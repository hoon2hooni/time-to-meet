import { ToggleButton } from "@components/icons";
import styled from "@emotion/styled";
import { useState } from "react";

import data from "../../data.schema.json";

const TimetableInfo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const currentAttendee = "사자";
  const isCurrentUser = (name: string) => name === currentAttendee;
  const timeObj: Record<string, number> = {};
  data.attendees.forEach(({ name, availableDates }) => {
    availableDates.forEach((time) => {
      timeObj[time] = (timeObj[time] ?? 0) + 1;
    });
  });

  const sortedKey = Object.keys(timeObj)
    .sort((a, b) => timeObj[b] - timeObj[a])
    .slice(0, 3);

  return (
    <CalendarInfo>
      <AttendeeHeader>{data.name} 참여자</AttendeeHeader>
      <Attendee>
        {data.attendees.map(({ name }) => (
          <Attender key={name} isCurrentUser={isCurrentUser(name)}>
            {name}
            {isCurrentUser(name) && "(나)"}
          </Attender>
        ))}
      </Attendee>
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
        sortedKey.map((k, i) => {
          const [_, month, day, time] = k.split("/");
          return (
            <EachResult key={i}>
              <Rank>{i + 1}위</Rank>
              <div>{`${month}월 ${day}일 ${time}:00시~${
                Number(time) + 1
              }:00시`}</div>
              <Count>{timeObj[k]}명</Count>
            </EachResult>
          );
        })}
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
      ? props.theme.colors.title
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
