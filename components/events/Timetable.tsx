import { Days, Pagination, Times } from "@components/events";
import styled from "@emotion/styled";
import type { Attendees } from "@eventsTypes";
import type { FC } from "react";
import { useState } from "react";
type Props = {
  startDate: Date;
  endDate: Date;
  maxCapacity: number;
  attendees: Attendees;
  currentAttendee: string;
};

const Timetable: FC<Props> = ({
  startDate,
  endDate,
  maxCapacity,
  attendees,
  currentAttendee,
}) => {
  const [pageIndex, setPageIndex] = useState(0);

  const handleClickPageUp = () => {
    setPageIndex((index) => index + 1);
  };

  const handleClickPageDown = () => {
    setPageIndex((index) => index - 1);
  };

  return (
    <Container>
      <Pagination
        startDate={startDate}
        endDate={endDate}
        onClickPageUp={handleClickPageUp}
        onClickPageDown={handleClickPageDown}
        pageIndex={pageIndex}
      />
      <Wrapper>
        <Days startDate={startDate} pageIndex={pageIndex} />
        <Times
          pageIndex={pageIndex}
          startDate={startDate}
          endDate={endDate}
          maxCapacity={maxCapacity}
          attendees={attendees}
          currentAttendee={currentAttendee}
        />
      </Wrapper>
    </Container>
  );
};

export default Timetable;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 4rem;
  margin-top: 2rem;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const Container = styled.div`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
