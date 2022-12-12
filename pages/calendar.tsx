import { Pagination, Timetable, TimetableInfo } from "@components/timetables";
import styled from "@emotion/styled";
import { db } from "@firebase/clientApp";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";

import type { NextPageWithLayout } from "./_app";

const New: NextPageWithLayout = () => {
  useEffect(() => {
    const collectionRef = collection(db, "events");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <Container>
        <Header>가능한 시간을 입력하세요!</Header>
        <TimetableInfo />
      </Container>
      <Pagination />
      <Timetable />
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
