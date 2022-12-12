import { Arrow } from "@components/icons";
import styled from "@emotion/styled";

const Pagination = () => {
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
