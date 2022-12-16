import Layout from "@components/Layout";
import { DateInputs, MemberCountInput, NameInput } from "@components/new";
import type { NewEvent } from "@customTypes";
import styled from "@emotion/styled";
import { Events } from "@eventsTypes";
import { db } from "@firebase/clientApp";
import { Timestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { register, handleSubmit, control, setValue } = useForm<NewEvent>();

  const onSubmit: SubmitHandler<NewEvent> = async (data) => {
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

  return (
    <>
      <Header>새로운 모임 생성하기</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NameInput control={control} register={register} />
        <MemberCountInput control={control} />
        <DateInputs control={control} setValue={setValue} register={register} />
        {/* TODO 나중에 시간범위 설정 가능하게 할 예정 */}
        <ButtonWrapper>
          <div>
            <TextP>
              생성하고 나면 <br />
              수정이 불가능해요
            </TextP>
            <CtaButton type="submit">
              <Text>생성하기</Text>
            </CtaButton>
          </div>
        </ButtonWrapper>
      </form>
    </>
  );
};

export default New;

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
`;
const CtaButton = styled.button`
  background-color: ${(props) => props.theme.colors.yellow};
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 0.5rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  border: none;
`;

const Text = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
`;
