import { Timetable, TimetableInfo } from "@components/timetables";
import styled from "@emotion/styled";
import type { Attendees } from "@eventsTypes";
import { eventsDocs } from "@firebase/clientApp";
import type { NextPageWithLayout } from "@pages/_app";
import { onSnapshot, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type Status = "loading" | "success" | "error" | "idle";

const New: NextPageWithLayout = () => {
  const router = useRouter();
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState<Timestamp>();
  const [endDate, setEndDate] = useState<Timestamp>();
  const [attendees, setAttendees] = useState<Attendees>([]);
  const currentAttendee = "사자";
  const id = router.query.id as string;
  const [status, setStatus] = useState<Status>("idle");
  useEffect(() => {
    if (!id) {
      return;
    }
    setStatus("loading");
    const eventRef = eventsDocs(id || "");
    const unsubscribe = onSnapshot(
      eventRef,
      (eventDoc) => {
        const event = eventDoc?.data();
        if (!event) {
          setStatus("error");
          return;
        }
        setEventName(event.name);
        setEndDate(event.endDate);
        setStartDate(event.startDate);
        setAttendees(event.attendees);
        setStatus("success");
      },
      (error) => {
        console.error(error);
        setStatus("error");
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

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
