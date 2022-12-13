import { Arrow } from "@components/icons";
import styled from "@emotion/styled";
import { addDateWithDays, getDayOfWeek, getDiffDays } from "@lib/days";
import { FC } from "react";

type ComponentProps = {
  startDate: Date;
  endDate: Date;
  pageIndex: number;
  onClickPageUp: () => void;
  onClickPageDown: () => void;
};

type ArrowProps = {
  direction: "left" | "right";
  isShown: boolean;
};

const Pagination: FC<ComponentProps> = ({
  startDate,
  endDate,
  pageIndex,
  onClickPageDown,
  onClickPageUp,
}) => {
  const diffDays = getDiffDays(startDate, endDate);
  const firstPageIndex = 0;
  const lastPageIndex = Math.floor(diffDays / 7);

  const isFirstPage = pageIndex !== firstPageIndex;
  const isLastPage = pageIndex !== lastPageIndex;

  const currentStartDate = addDateWithDays(startDate, pageIndex * 7);

  return (
    <Container>
      <ArrowWrapper
        isShown={isFirstPage}
        direction={"left"}
        onClick={onClickPageDown}
      >
        <Arrow />
      </ArrowWrapper>
      {currentStartDate.getDate()}일 {getDayOfWeek(currentStartDate)}요일
      <ArrowWrapper
        isShown={isLastPage}
        direction={"right"}
        onClick={onClickPageUp}
      >
        <Arrow />
      </ArrowWrapper>
    </Container>
  );
};

export default Pagination;

const ArrowWrapper = styled.div<ArrowProps>`
  visibility: ${(props) => (props.isShown ? "visible" : "hidden")};
  transform: ${(props) =>
    props.direction === "left" ? "rotate(-180deg)" : ""};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 4rem;
  font-size: 1.5rem;
  font-weight: 700;
`;
