import { Toast } from "@components/common";
import { Days, Pagination, Timetable } from "@components/events";
import { Eraser } from "@components/icons";
import styled from "@emotion/styled";
import type { Attendees } from "@eventsTypes";
import {
  addDateAndTime,
  getDaysDifferenceFromMonday,
  getDaysDifferenceFromSundayReverse,
  getDiffDays,
  subtractDateAndTime,
} from "@lib/days";
import useToast from "@lib/hooks/useToast";
import type { FC } from "react";
import { useState } from "react";
type Props = {
  startDate: Date;
  endDate: Date;
  attendees: Attendees;
  currentAttendee: string;
  maxCapacity: number;
};

type EraserProps = {
  isEraseMode: boolean;
};
const TimetableTemplate: FC<Props> = ({
  startDate,
  endDate,
  attendees,
  currentAttendee,
  maxCapacity,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isEraseMode, setIsEraseMode] = useState(false);
  const { isToastOpen, toastKeyVal, toggleToast } = useToast();
  const startWeekOfMonday = subtractDateAndTime(startDate, {
    days: getDaysDifferenceFromMonday(startDate),
  });
  const endWeekOfSunday = addDateAndTime(endDate, {
    days: getDaysDifferenceFromSundayReverse(endDate),
  });

  const handleClickPageUp = () => {
    setCurrentPageIndex((index) => index + 1);
  };

  const handleClickPageDown = () => {
    setCurrentPageIndex((index) => index - 1);
  };
  const toastMessage = isEraseMode
    ? "지우개 모드 활성화!"
    : "지우개 모드 해제!";
  const totalNumberOfTableDays = getDiffDays(
    startWeekOfMonday,
    endWeekOfSunday
  );
  const lastPageIndex = Math.floor(totalNumberOfTableDays / 7);
  return (
    <Container>
      <Pagination
        startWeekOfMonday={startWeekOfMonday}
        onClickPageUp={handleClickPageUp}
        onClickPageDown={handleClickPageDown}
        currentPageIndex={currentPageIndex}
        totalNumberOfTableDays={totalNumberOfTableDays}
      />
      <Wrapper>
        <EraserWrapper>
          <Text isEraseMode={isEraseMode}>지우개</Text>
          <EraserIconWrapper
            onClick={() => {
              setIsEraseMode((prev) => !prev);
              toggleToast();
            }}
          >
            <Eraser isEraseMode={isEraseMode} />
          </EraserIconWrapper>
        </EraserWrapper>
        {isToastOpen && <Toast message={toastMessage} key={toastKeyVal} />}
        <Days
          startWeekOfMonday={startWeekOfMonday}
          startDate={startDate}
          endDate={endDate}
          currentPageIndex={currentPageIndex}
          lastPageIndex={lastPageIndex}
          currentAttendee={currentAttendee}
          attendees={attendees}
        />
        <Timetable
          endWeekOfSunday={endWeekOfSunday}
          startWeekOfMonday={startWeekOfMonday}
          currentPageIndex={currentPageIndex}
          startDate={startDate}
          endDate={endDate}
          attendees={attendees}
          currentAttendee={currentAttendee}
          isEraseMode={isEraseMode}
          maxCapacity={maxCapacity}
        />
      </Wrapper>
    </Container>
  );
};

export default TimetableTemplate;

const EraserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const Text = styled.span<EraserProps>`
  font-size: 1.2rem;
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 4rem;
  margin-top: 2rem;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Container = styled.div`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EraserIconWrapper = styled.div`
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.5;
      transition: all 0.2s ease-in-out;
    }
  }

  &:active {
    scale: 1.1;
  }
`;
