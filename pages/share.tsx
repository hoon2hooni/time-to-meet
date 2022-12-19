import { Button } from "@components/common";
import { EventInfo } from "@components/common";
import Retention from "@components/common/Retention";
import styled from "@emotion/styled";
import { eventsDocs } from "@firebase/clientApp";
import { dateToPattern } from "@lib/days";
import type { NewEvent } from "@newTypes";
import { getDoc } from "firebase/firestore";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
export default function Home({
  id,
  name,
  maxCapacity,
  endDate,
  startDate,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    if (window.Kakao?.isInitialized()) {
      return;
    }
    window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }, []);

  const shareMessage = () => {
    window?.Kakao.Share.sendCustom({
      templateId: 87342,
      templateArgs: {
        id,
      },
    });
  };

  return (
    <>
      <Layout>
        <WrapperMain>
          <Header>모임이 생성되었어요!</Header>
          <EventInfo
            name={name}
            maxCapacity={maxCapacity}
            startDate={startDate}
            endDate={endDate}
          />
          <Comment>
            <strong>카톡으로 링크를 공유하면 매칭이 시작되요</strong>
          </Comment>
          <Wrapper>
            <LinkBox>
              <TextSpan>{`https://timetomeet.vercel.app/events/${id}`}</TextSpan>
            </LinkBox>
            <Button onClick={shareMessage}>공유하기</Button>
          </Wrapper>
        </WrapperMain>
        <Retention />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  NewEvent & { id: string }
> = async (context) => {
  const id = (context?.query?.id || "") as string;
  if (!id) {
    return {
      notFound: true,
    };
  }

  const eventRef = await getDoc(eventsDocs(id));

  if (!eventRef.exists()) {
    return {
      notFound: true,
    };
  }

  const eachEvent = eventRef.data();
  const { name, maxCapacity } = eachEvent;
  const startDate = dateToPattern(eachEvent.startDate.toDate());
  const endDate = dateToPattern(eachEvent.endDate.toDate());

  return {
    props: { id, name, maxCapacity, startDate, endDate },
  };
};

const Layout = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WrapperMain = styled.main`
  padding: 10rem 2rem 0rem 2rem;
  max-width: 39rem;
  width: 100%;
  margin: 0 auto;
`;
const Header = styled.header`
  font-size: 3.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.yellow};
  margin-bottom: 2rem;
`;

const Comment = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: 4rem;
`;

const Wrapper = styled.div`
  display: flex;
  height: 4rem;
  margin: 2rem 0rem 4rem 0rem;
`;

const LinkBox = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 100%;
  padding: 0 1.3rem;
  font-size: 1.2rem;
  width: calc(100% - 12rem);
  display: flex;
  align-items: center;
  margin-right: 1rem;
  border-radius: 0.5rem;
`;

const TextSpan = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
