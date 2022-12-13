import styled from "@emotion/styled";
import { addDateWithDays } from "@lib/days";
import { FC } from "react";

import data from "../../data.schema.json";

type Times = number[];
type ComponentProps = {
  startDate: Date;
  endDate: Date;
  pageIndex: number;
};

const Times: FC<ComponentProps> = ({ pageIndex, startDate, endDate }) => {
  const timeObj: Record<string, number> = {};

  data.attendees.forEach(({ availableDates }) => {
    availableDates.forEach((time) => {
      timeObj[time] = (timeObj[time] ?? 0) + 1;
    });
  });

  const END_TIME = 24;
  const START_TIME = 8;

  const dayTimeArray = new Array(7).fill(
    new Array(END_TIME - START_TIME).fill(0).map((_, i) => i + 8)
  ) as Times[];

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const isInRange = (i: number) => {
    return (
      endDate.getTime() >=
      addDateWithDays(startDate, i + pageIndex * 7).getTime()
    );
  };

  return (
    <Container>
      {dayTimeArray.map((times, i) => {
        if (isInRange(i)) {
          return (
            <AvailableDate key={i}>
              {times.map((time, j) => (
                <EachRowTime key={i}>
                  {i === 0 && <TimeUnit>{j + 8}:00</TimeUnit>}
                  {timeObj[`2022/12/${i + 7 * pageIndex + startDay}/${j + 8}`]}
                </EachRowTime>
              ))}
            </AvailableDate>
          );
        }
        return <NotAvailableDate key={i} />;
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
  height: 34rem;
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

const EachRowTime = styled.div`
  position: relative;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
`;
