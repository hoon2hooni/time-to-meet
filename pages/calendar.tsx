import Layout from "@components/Layout";
import styled from "@emotion/styled";

import type { NextPageWithLayout } from "./_app";

const New: NextPageWithLayout = () => {
  return (
    <>
      <Header>이제 내 일정을 입력해 보세요</Header>
      <CalendarInfo>
        <TextHeader>연말 송별회</TextHeader>
        <TextDaysWrapper>
          <div>2022/12/7</div>
          <div>~</div>
          <div>2022/12/13</div>
        </TextDaysWrapper>
        <AttendeeHeader>참여자</AttendeeHeader>
        <Attendee>
          <div>한상훈</div>
          <div>김민수</div>
          <div>김민수</div>
          <div>김민수</div>
        </Attendee>
      </CalendarInfo>
      <Wrapper>
        <Days>
          <EachDay>
            <div>7</div>
            <div>일</div>
          </EachDay>
          <EachDay>
            <div>8</div>
            <div>월</div>
          </EachDay>
          <EachDay>
            <div>9</div>
            <div>화</div>
          </EachDay>
          <EachDay>
            <div>10</div>
            <div>수</div>
          </EachDay>
          <EachDay>
            <div>11</div>
            <div>목</div>
          </EachDay>
          <EachDay>
            <div>12</div>
            <div>금</div>
          </EachDay>
          <EachDay>
            <div>13</div>
            <div>토</div>
          </EachDay>
        </Days>
        <CalendarWrapper>
          <EachTime>
            <EachSmallTime style={{ backgroundColor: "#FDB849" }}>
              <TimeUnit>09:00</TimeUnit>1
            </EachSmallTime>
            <EachSmallTime style={{ backgroundColor: "#FDB849" }}>
              <TimeUnit>10:00</TimeUnit>1
            </EachSmallTime>
            <EachSmallTime style={{ backgroundColor: "#FDB849" }}>
              <TimeUnit>11:00</TimeUnit>1
            </EachSmallTime>
            <EachSmallTime style={{ backgroundColor: "#FDB849" }}>
              <TimeUnit>12:00</TimeUnit>1
            </EachSmallTime>
            <EachSmallTime>
              <TimeUnit>13:00</TimeUnit>
            </EachSmallTime>
            <EachSmallTime>
              <TimeUnit>14:00</TimeUnit>
            </EachSmallTime>
            <EachSmallTime>
              <TimeUnit>15:00</TimeUnit>
            </EachSmallTime>
            <EachSmallTime>
              <TimeUnit>16:00</TimeUnit>
            </EachSmallTime>
            <EachSmallTime>
              <TimeUnit>17:00</TimeUnit>
            </EachSmallTime>
            <EachSmallTime>
              <TimeUnit>18:00</TimeUnit>
            </EachSmallTime>
            <EachSmallTime>
              <TimeUnit>19:00</TimeUnit>
            </EachSmallTime>
            <EachSmallTime>
              <TimeUnit>20:00</TimeUnit>
            </EachSmallTime>
            <EachSmallTime>
              <TimeUnit>21:00</TimeUnit>
            </EachSmallTime>
          </EachTime>
          <EachTime>
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
          </EachTime>
          <EachTime>
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
          </EachTime>
          <EachTime>
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
          </EachTime>
          <EachTime>
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime style={{ backgroundColor: "#90EE90" }}>
              2
            </EachSmallTime>
            <EachSmallTime style={{ backgroundColor: "#90EE90" }}>
              2
            </EachSmallTime>
            <EachSmallTime style={{ backgroundColor: "#90EE90" }}>
              2
            </EachSmallTime>
            <EachSmallTime style={{ backgroundColor: "#90EE90" }}>
              2
            </EachSmallTime>
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
          </EachTime>
          <EachTime>
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime style={{ backgroundColor: "#90EE90" }}>
              2
            </EachSmallTime>
            <EachSmallTime style={{ backgroundColor: "#90EE90" }}>
              2
            </EachSmallTime>
            <EachSmallTime style={{ backgroundColor: "#90EE90" }}>
              2
            </EachSmallTime>
            <EachSmallTime style={{ backgroundColor: "#90EE90" }}>
              2
            </EachSmallTime>
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
          </EachTime>
          <EachTime>
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
            <EachSmallTime />
          </EachTime>
        </CalendarWrapper>
      </Wrapper>
    </>
  );
};

New.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default New;

const Header = styled.header`
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  height: 5.2rem;
  margin-bottom: 1rem;
`;

const TextHeader = styled.div`
  color: ${(props) => props.theme.colors.title};
  margin-top: 0rem;
  font-size: 2rem;
  font-weight: 700;
`;

const TextDaysWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 11rem;
  margin-top: 1rem;
  font-weight: 700;
`;

const AttendeeHeader = styled.div`
  margin-top: 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
`;
const Attendee = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  width: 50%;
  margin-top: 0.5rem;
`;

const CalendarInfo = styled.div`
  width: 100%;
  height: 12rem;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 1rem;
  padding: 1.5rem 1rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.2rem 0.1rem 0.2rem;
  margin-top: 2rem;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
  width: 100%;
  margin-bottom: 2rem;
`;

const EachDay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.3rem;
  height: 5.2rem;
  background-color: ${(props) => props.theme.colors.white};
`;

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.2rem;
`;

const EachTime = styled.div`
  border-radius: 0.3rem;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  gap: 0.2rem;
  height: 34rem;
`;
const TimeUnit = styled.div`
  position: absolute;
  top: -0.5rem;
  left: -3rem;
  z-index: 20;
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
  color: ${(props) => props.theme.colors.white};
  font-size: 1.5rem;
`;

const CtaButton = styled.button`
  background-color: ${(props) => props.theme.colors.title};
  font-size: 2rem;
  font-weight: 700;
  border-radius: 2rem;
  width: 8rem;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  border: none;
`;

const Text = styled.span`
  font-size: 1rem;
  font-weight: 700;
  border-radius: 2rem;
  color: ${(props) => props.theme.colors.white};
`;
