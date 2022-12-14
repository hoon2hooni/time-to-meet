import { Timetable, TimetableInfo } from "@components/timetables";
import styled from "@emotion/styled";
import useEventsStore from "@hooks/useEventsStore";
import type { NextPageWithLayout } from "@pages/_app";
import { useRouter } from "next/router";

const New: NextPageWithLayout = () => {
  const router = useRouter();
  const currentAttendee = "사자";
  const id = router?.query?.id as string;
  const { eventName, startDate, endDate, attendees, status } =
    useEventsStore(id);

  if (status === "idle" || status === "loading") {
    return <div>로딩중...</div>;
  }

  if (status === "error") {
    return <div>잘못된 url입니다</div>;
  }

  return (
    <>
      <Container>
        <Header>가능한 시간을 입력하세요!</Header>
        <TimetableInfo
          eventName={eventName}
          attendees={attendees}
          currentAttendee={currentAttendee}
        />
      </Container>
      <Timetable
        startDate={startDate?.toDate() || new Date()}
        endDate={endDate?.toDate() || new Date()}
        memberCount={4}
        attendees={attendees}
        currentAttendee={currentAttendee}
      />
    </>
  );
};

export default New;

const Container = styled.div`
  padding: 2rem 4rem;
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;
