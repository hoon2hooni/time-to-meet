import Badge from "@components/common/Badge";
import { Arrow } from "@components/icons";
import styled from "@emotion/styled";
import type { FC } from "react";

type ComponentProps = {
  currentPageIndex: number;
  startWeekOfMonday: Date;
  onClickPageUp: () => void;
  onClickPageDown: () => void;
  totalNumberOfTableDays: number;
};

type ArrowProps = {
  direction: "left" | "right";
  isShown: boolean;
};

const Pagination: FC<ComponentProps> = ({
  currentPageIndex,
  onClickPageDown,
  onClickPageUp,
  startWeekOfMonday,
  totalNumberOfTableDays,
}) => {
  const firstPageIndex = 0;
  const lastPageIndex = Math.floor(totalNumberOfTableDays / 7);

  const isFirstPage = currentPageIndex === firstPageIndex;
  const isLastPage = currentPageIndex === lastPageIndex;

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
          {startWeekOfMonday.getFullYear()}년 {startWeekOfMonday.getMonth() + 1}
          월
        </span>
      </TextWrapper>
      <ArrowWrapper
        isShown={!isLastPage}
        direction={"right"}
        onClick={onClickPageUp}
      >
        <BadgeWrapper>
          <Badge>다음주도 있어요!</Badge>
        </BadgeWrapper>
        <Arrow />
      </ArrowWrapper>
    </Container>
  );
};

export default Pagination;

const ArrowWrapper = styled.div<ArrowProps>`
  position: relative;
  align-items: center;
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  justify-content: center;
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

const BadgeWrapper = styled.div`
  position: absolute;
  right: 2.5rem;
  font-size: 1.2rem;
`;
