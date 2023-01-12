import styled from "@emotion/styled";
import { parseStringDateAndCombine } from "@lib/days";
import type { NewEvent } from "@newTypes";
import type { FC } from "react";
const EventInfo: FC<NewEvent> = ({ name, maxCapacity, startDate, endDate }) => {
  return (
    <CalendarInfo>
      <TextHeader>{name}</TextHeader>
      <Text>
        참여 인원 <strong>{maxCapacity}</strong> 명
      </Text>
      <Text>
        <strong>{parseStringDateAndCombine(startDate, "-")}</strong> 부터
        <strong> {parseStringDateAndCombine(endDate, "-")}</strong>,
      </Text>
      <Text>
        <strong>오전 8</strong>시부터 <strong>24</strong>시 사이의
      </Text>
      <Text>일정을 매칭할게요</Text>
    </CalendarInfo>
  );
};

export default EventInfo;

const TextHeader = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CalendarInfo = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 1rem;
  padding: 3.2rem 2rem;
`;
const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  & > strong {
    font-weight: 700;
  }
`;
