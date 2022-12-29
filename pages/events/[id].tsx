import { Button, ErrorBox, Modal } from "@components/common";
import { EntranceInput, Timetable, TimetableInfo } from "@components/events";
import { LoadingSpinner } from "@components/icons";
import styled from "@emotion/styled";
import useEventsStore from "@hooks/useEventsStore";
import useUrlEventId from "@hooks/useUrlEventId";
import { closePage } from "@lib/handleCrossPlatform";
import type { NextPageWithLayout } from "@pages/_app";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const getLocalStorageKey = (id: string) => {
  return `${id}-currentAttendee`;
};

const Events: NextPageWithLayout = () => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  useEffect(() => {
    const resizeHandlerForFixedHeight = () => {
      if (window !== undefined) {
        setWindowHeight(window.innerHeight);
      }
    };
    if (window !== undefined) {
      window.addEventListener("resize", resizeHandlerForFixedHeight);
    }
    resizeHandlerForFixedHeight();
    return () => {
      if (window !== undefined) {
        window.removeEventListener("resize", resizeHandlerForFixedHeight);
      }
    };
  }, []);
  const id = useUrlEventId();
  const [currentAttendee, setCurrentAttendee] = useState<string>("");
  const {
    eventName,
    startDate,
    endDate,
    attendees,
    status,
    maxCapacity,
    setAttendees,
  } = useEventsStore(id);

  const handleClickEntrance = (name: string) => {
    if (name === "") {
      return "이름을 입력해주세요";
    }
    const isExist =
      attendees.findIndex((attendee) => attendee.name === name) !== -1;

    if (maxCapacity <= attendees.length && !isExist) {
      return "인원이 초과되었습니다";
    }
    setCurrentAttendee(name);
    if (window !== undefined) {
      window.localStorage.setItem(getLocalStorageKey(id), name);
    }
    toast.success(`${name} 님이 입장하였습니다.`);
    return "";
  };

  useEffect(() => {
    if (window === undefined || !id) return;
    const userName = window.localStorage.getItem(getLocalStorageKey(id));
    setCurrentAttendee(
      window.localStorage.getItem(getLocalStorageKey(id)) || ""
    );
    if (userName) {
      toast.success(`${userName} 님이 입장하였습니다.`);
    }
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
    <ContainerWrapper height={windowHeight}>
      {!currentAttendee && (
        <Modal>
          <EntranceInput onClickEntrance={handleClickEntrance} />
        </Modal>
      )}

      <Container>
        <Header>
          <Text>가능한 시간을 입력하세요!</Text>
          <StyledLink href="/">모임 만들기</StyledLink>
        </Header>
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
        maxCapacity={maxCapacity}
        attendees={attendees}
        currentAttendee={currentAttendee}
      />
    </ContainerWrapper>
  );
};

export default Events;

const ContainerWrapper = styled.div<{ height: number }>`
  padding: 0;
  margin: 0;
  height: 100vh;
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  touch-action: pan-x;
`;

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
`;

const Header = styled.header`
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-bottom: 2rem;
  width: 100%;
`;

const Text = styled.span`
  font-size: 2rem;
  margin-right: auto;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.yellow};
  }
  cursor: pointer;
`;
