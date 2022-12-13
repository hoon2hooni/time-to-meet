import { Arrow } from "@components/icons";
import styled from "@emotion/styled";
import { FC } from "react";

type Props = {
  startDate: Date;
  endDate: Date;
};

const Pagination: FC<Props> = ({ startDate, endDate }) => {
  console.log(startDate, endDate);
  return (
    <CurrentDay>
      <div style={{ transform: "rotate(-180deg)" }}>
        <Arrow />
      </div>
      15일 월요일
      <div>
        <Arrow />
      </div>
    </CurrentDay>
  );
};

export default Pagination;

const CurrentDay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 4rem;
  font-size: 1.5rem;
  font-weight: 700;
`;
