import { Days, Pagination } from "@components/timetables";
import styled from "@emotion/styled";
import { useState } from "react";
import { FC } from "react";

import data from "../../data.schema.json";
type Times = number[];

type Props = {
  startDate: Date;
  endDate: Date;
};

const Timetable: FC<Props> = ({ startDate, endDate }) => {
  const dayTimeArray = new Array(7).fill(
    new Array(24 - 8).fill(0).map((_, i) => i + 8)
  ) as Times[];

  const timeObj: Record<string, number> = {};
  data.attendees.forEach(({ availableDates }) => {
    availableDates.forEach((time) => {
      timeObj[time] = (timeObj[time] ?? 0) + 1;
    });
  });

  const [pageIndex, setPageIndex] = useState(0);

  const handleClickPageUp = () => {
    setPageIndex((index) => index + 1);
  };

  const handleClickPageDown = () => {
    setPageIndex((index) => index - 1);
  };

  const startDay = new Date(data.startDate).getDate();
  // const endDay = new Date(data.endDate).getDate();
  const startDayOfWeek = new Date(data.startDate).getDay();

  return (
    <>
      <Pagination
        startDate={startDate}
        endDate={endDate}
        onClickPageUp={handleClickPageUp}
        onClickPageDown={handleClickPageDown}
        pageIndex={pageIndex}
      />
      <Wrapper>
        <Days startDate={startDate} pageIndex={pageIndex} />
        <CalendarWrapper>
          {dayTimeArray.map((times, i) => {
            if (i === 0) {
              return (
                <EachTime key={i}>
                  {times.map((time, j) => (
                    <EachSmallTime key={i}>
                      <TimeUnit>{j + 8}:00</TimeUnit>
                      {
                        timeObj[
                          `2022/12/${i + 7 * pageIndex + startDay}/${j + 8}`
                        ]
                      }
                    </EachSmallTime>
                  ))}
                </EachTime>
              );
            } else {
              return (
                <EachTime key={i}>
                  {times.map((time, j) => (
                    <EachSmallTime
                      key={j}
                      onClick={() => {
                        console.log(`2022/12/${i + startDay}/${j + 8}`);
                      }}
                    >
                      {timeObj[`2022/12/${i + startDay}/${j + 8}`]}
                    </EachSmallTime>
                  ))}
                </EachTime>
              );
            }
          })}
        </CalendarWrapper>
      </Wrapper>
    </>
  );
};

export default Timetable;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem 4rem 2rem 4rem;
  margin-top: 2rem;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.2rem;
`;

const EachTime = styled.div`
  border-radius: 0.3rem;
  display: grid;
  grid-template-rows: repeat(32, 2rem);
  gap: 0.2rem;
  height: 34rem;
`;
const TimeUnit = styled.div`
  position: absolute;
  top: -0.5rem;
  left: -3rem;

  font-size: 0.5rem;
  color: #585858;
`;

const EachSmallTime = styled.div`
  position: relative;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
`;
