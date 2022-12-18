import { LoadingSpinner } from "@components/common";
import { Button, ErrorBox } from "@components/common";
import Retention from "@components/common/Retention";
import Modal from "@components/Modal";
import {
  EntranceInput,
  Timetable,
  TimetableInfo,
} from "@components/timetables";
import styled from "@emotion/styled";
import { getIndexOfAttendees } from "@firebase/attendeeGenerator";
import useEventsStore from "@hooks/useEventsStore";
import useUrlEventId from "@hooks/useUrlEventId";
import closePage from "@lib/closePage";
import type { NextPageWithLayout } from "@pages/_app";
import { useEffect, useState } from "react";

const getLocalStorageKey = (id: string) => {
  return `${id}-currentAttendee`;
};

const Events: NextPageWithLayout = () => {
  const id = useUrlEventId();
  const [currentAttendee, setCurrentAttendee] = useState<string>("");
  const {
    eventName,
    startDate,
    endDate,
    attendees,
    status,
    memberCount,
    setAttendees,
  } = useEventsStore(id);

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
    if (window !== undefined) {
      window.localStorage.setItem(getLocalStorageKey(id), name);
    }
    return "";
  };

  useEffect(() => {
    if (window === undefined || !id) return;
    setCurrentAttendee(
      window.localStorage.getItem(getLocalStorageKey(id)) || ""
    );
  }, [id]);

  if (status === "idle" || status === "loading") {
    return (
      <FullViewWrapper>
        <LoadingSpinner />
      </FullViewWrapper>
    );
  }

  if (status === "error") {
    return (
      <FullViewWrapper>
        <ErrorBox>
          <p>
            앗! 존재하지 않는 모임이에요
            <br />
            모임 링크를 다시 한 번 확인해보세요
          </p>
          <Button onClick={closePage} color="secondary">
            창닫기
          </Button>
        </ErrorBox>
      </FullViewWrapper>
    );
  }
  return (
    <>
      {!currentAttendee && (
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
          setAttendees={setAttendees}
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
const FullViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;
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
