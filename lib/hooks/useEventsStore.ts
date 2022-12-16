import { Attendees } from "@eventsTypes";
import { eventsDocs } from "@firebase/clientApp";
import { onSnapshot, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
type Status = "loading" | "success" | "error" | "idle";

const useEventsStore = (id = "") => {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState<Timestamp>();
  const [endDate, setEndDate] = useState<Timestamp>();
  const [attendees, setAttendees] = useState<Attendees>([]);
  const [memberCount, setMemberCount] = useState<number>(0);
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
        setMemberCount(event.memberCount);
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

  return { eventName, startDate, endDate, attendees, status, memberCount, setAttendees };
};

export default useEventsStore;
