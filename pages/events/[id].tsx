import { Timetable, TimetableInfo } from "@components/timetables";
import styled from "@emotion/styled";
import type { Attendees, EventsDocs } from "@eventsTypes";
import { createDocs } from "@firebase/clientApp";
import { secondsToDate } from "@lib/days";
import type { NextPageWithLayout } from "@pages/_app";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

type TimeStamp = {
  seconds: number;
};

const New: NextPageWithLayout = () => {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState<TimeStamp>({ seconds: 0 });
  const [endDate, setEndDate] = useState<TimeStamp>({ seconds: 0 });
  const [attendees, setAttendees] = useState<Attendees>([]);
  useEffect(() => {
    const docRef = createDocs<EventsDocs>(
      "events",
      process.env.NEXT_PUBLIC_TEST_DOC_ID || ""
    );
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.data()) {
        setEventName(doc.data()?.name || "");
        setEndDate(doc.data()?.endDate || { seconds: 0 });
        setStartDate(doc.data()?.startDate || { seconds: 0 });
        setAttendees(doc.data()?.attendees || []);
        return;
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Container>
        <Header>가능한 시간을 입력하세요!</Header>
        <TimetableInfo eventName={eventName} attendees={attendees} />
      </Container>

      <Timetable
        startDate={secondsToDate(startDate.seconds)}
        endDate={secondsToDate(endDate.seconds)}
        memberCount={4}
        attendees={attendees}
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
