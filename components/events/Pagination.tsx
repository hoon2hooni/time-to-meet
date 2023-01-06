import { Arrow } from "@components/icons";
import styled from "@emotion/styled";
import {
  addDateAndTime,
  dateToPattern,
  getDayOfWeek,
  getDiffDays,
  parseStringDateAndCombine,
} from "@lib/days";
import type { FC } from "react";

type ComponentProps = {
  startDate: Date;
  endDate: Date;
  currentPageIndex: number;
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
  currentPageIndex,
  onClickPageDown,
  onClickPageUp,
}) => {
  const diffDays = getDiffDays(startDate, endDate);
  const firstPageIndex = 0;
  const lastPageIndex = Math.floor(diffDays / 7);

  const isFirstPage = currentPageIndex === firstPageIndex;
  const isLastPage = currentPageIndex === lastPageIndex;
  const currentStartDate = addDateAndTime(startDate, {
    days: currentPageIndex * 7,
  });

  const currentLastDate =
    endDate.getTime() > addDateAndTime(currentStartDate, { days: 6 }).getTime()
      ? addDateAndTime(currentStartDate, { days: 6 })
      : endDate;

  const parsedCurrentStartDate = parseStringDateAndCombine(
    dateToPattern(currentStartDate),
    "-"
  );
  const parsedCurrentLastDate = parseStringDateAndCombine(
    dateToPattern(currentLastDate),
    "-"
  );

  return (
    <Container>
      <ArrowWrapper
        isShown={!isFirstPage}
        direction={"left"}
        onClick={onClickPageDown}
      >
        <Arrow />
      </ArrowWrapper>
      <TextWrapper>
        <span>
          {parsedCurrentStartDate} {getDayOfWeek(currentStartDate)}요일
        </span>
        {parsedCurrentStartDate !== parsedCurrentLastDate && (
          <span>
            {" - "}
            {parsedCurrentLastDate} {getDayOfWeek(currentLastDate)}요일
          </span>
        )}
      </TextWrapper>
      <ArrowWrapper
        isShown={!isLastPage}
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
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.5;
      transition: all 0.1s ease-in-out;
    }
  }
  &:active {
    opacity: 0.5;
    scale: 0.8;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 4rem;
  font-size: 1.5rem;
  font-weight: 700;
`;
const TextWrapper = styled.div`
  font-size: 1.1rem;
`;
