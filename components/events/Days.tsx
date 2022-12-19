import styled from "@emotion/styled";
import { addDateWithDays, getDayOfWeek } from "@lib/days";
import type { FC } from "react";

type ComponentProps = {
  startDate: Date;
  pageIndex: number;
};

const Days: FC<ComponentProps> = ({ startDate, pageIndex }) => {
  return (
    <Container>
      {new Array(7).fill(0).map((_, i) => {
        return (
          <EachDay key={i}>
            <div>{addDateWithDays(startDate, i + pageIndex * 7).getDate()}</div>
            <div>
              {getDayOfWeek(addDateWithDays(startDate, i + pageIndex * 7))}
            </div>
          </EachDay>
        );
      })}
    </Container>
  );
};
export default Days;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const EachDay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.3rem;
  height: 5rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
`;
