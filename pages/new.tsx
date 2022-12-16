import { Button } from "@components/common";
import { DateInputs, MemberCountInput, NameInput } from "@components/new";
import InfoModal from "@components/new/InfoModal";
import type { NewEvent } from "@customTypes";
import styled from "@emotion/styled";
import { Events } from "@eventsTypes";
import { db } from "@firebase/clientApp";
import { Timestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import type { NextPageWithLayout } from "./_app";

const fromFormDataToEvent = (data: NewEvent): Omit<Events, "id"> => {
  const { name, memberCount, startDate, endDate } = data;
  return {
    name,
    memberCount,
    startDate: Timestamp.fromDate(new Date(startDate)),
    endDate: Timestamp.fromDate(new Date(endDate)),
    attendees: [],
  };
};

const New: NextPageWithLayout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, control, setValue } = useForm<NewEvent>();
  const handleSubmitData = async (data: NewEvent) => {
    const event = fromFormDataToEvent(data);
    try {
      const eventsRef = await addDoc(collection(db, "events"), event);
      router.push({
        pathname: "/share",
        query: { id: eventsRef.id },
      });
    } catch (e) {
      console.error("네트워크 에러 발생");
    }
  };

  const onSubmit: SubmitHandler<NewEvent> = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Layout>
      {modalOpen && (
        <InfoModal
          control={control}
          onSubmitData={handleSubmitData}
          onCloseModal={handleCloseModal}
        />
      )}
      <Header>새로운 모임 생성하기</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NameInput control={control} register={register} />
        <MemberCountInput control={control} />
        <DateInputs control={control} setValue={setValue} register={register} />
        {/* TODO 나중에 시간범위 설정 가능하게 할 예정 */}
        <ButtonWrapper>
          <Wrapper>
            <TextP>
              생성하고 나면 <br />
              수정이 불가능해요
            </TextP>
            <Button width={"100%"} type="submit">
              <Text>생성하기</Text>
            </Button>
          </Wrapper>
        </ButtonWrapper>
      </form>
    </Layout>
  );
};

export default New;

const Layout = styled.div`
  width: 100%;
  max-width: 42.8rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
`;

const Header = styled.header`
  color: ${(props) => props.theme.colors.yellow};
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  font-weight: 700;
  height: 5.2rem;
  margin-bottom: 2.4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TextP = styled.div`
  text-align: right;
  margin-bottom: 1.2rem;
  line-height: 1.5;
`;

const Text = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
