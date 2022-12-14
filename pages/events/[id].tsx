import { Timetable, TimetableInfo } from "@components/timetables";
import styled from "@emotion/styled";
import type { Attendees } from "@eventsTypes";
import { eventsDocs } from "@firebase/clientApp";
import type { NextPageWithLayout } from "@pages/_app";
import { onSnapshot, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

const New: NextPageWithLayout = () => {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState<Timestamp>();
  const [endDate, setEndDate] = useState<Timestamp>();
  const [attendees, setAttendees] = useState<Attendees>([]);
  const currentAttendee = "사자";
  useEffect(() => {
    const eventRef = eventsDocs(process.env.NEXT_PUBLIC_TEST_DOC_ID || "");
    const unsubscribe = onSnapshot(eventRef, (eventDoc) => {
      const event = eventDoc?.data();
      if (!event) {
        return;
      }

      setEventName(event.name);
      setEndDate(event.endDate);
      setStartDate(event.startDate);
      setAttendees(event.attendees);
    });
    return unsubscribe;
  }, []);

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
