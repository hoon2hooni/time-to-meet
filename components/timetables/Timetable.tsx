import { Days, Pagination, Times } from "@components/timetables";
import styled from "@emotion/styled";
import { useState } from "react";
import { FC } from "react";

type Props = {
  startDate: Date;
  endDate: Date;
  memberCount: number;
};

const Timetable: FC<Props> = ({ startDate, endDate, memberCount }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const handleClickPageUp = () => {
    setPageIndex((index) => index + 1);
  };

  const handleClickPageDown = () => {
    setPageIndex((index) => index - 1);
  };

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
        <Times
          pageIndex={pageIndex}
          startDate={startDate}
          endDate={endDate}
          memberCount={memberCount}
        />
      </Wrapper>
    </>
  );
};

export default Timetable;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem 4rem;
  margin-top: 2rem;
  background-color: ${(props) => props.theme.colors.secondary};
`;
