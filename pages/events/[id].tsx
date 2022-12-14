import Modal from "@components/Modal";
import {
  EntranceInput,
  Timetable,
  TimetableInfo,
} from "@components/timetables";
import styled from "@emotion/styled";
import useEventsStore from "@hooks/useEventsStore";
import type { NextPageWithLayout } from "@pages/_app";
import { useRouter } from "next/router";
import { useState } from "react";

const Events: NextPageWithLayout = () => {
  const [currentAttendee, setCurrentAttendee] = useState<string>("사자");
  const [isFirstEntrance, setIsFirstEntrance] = useState(true);
  const router = useRouter();
  const id = router?.query?.id as string;
  const { eventName, startDate, endDate, attendees, status, memberCount } =
    useEventsStore(id);

  const handleClickEntrance = (name: string) => {
    if (name === "") {
      return "이름을 입력해주세요";
    }
    const isExist =
      attendees.findIndex((attendee) => attendee.name === name) !== -1;

    if (memberCount <= attendees.length && !isExist) {
      return "인원이 초과되었습니다";
    }

    setCurrentAttendee(name);
    setIsFirstEntrance(false);
    return "";
  };

  if (status === "idle" || status === "loading") {
    return <div>로딩중...</div>;
  }

  if (status === "error") {
    return <div>잘못된 url입니다</div>;
  }

  return (
    <>
      {isFirstEntrance && (
        <Modal>
          <EntranceInput onClickEntrance={handleClickEntrance} />
        </Modal>
      )}
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

export default Events;

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
