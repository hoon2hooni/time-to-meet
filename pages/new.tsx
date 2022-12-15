import GenericInput from "@components/input/GenericInput";
import InputTemplate from "@components/input/InputTemplate";
import Layout from "@components/Layout";
import type { RoomInfo } from "@customTypes";
import styled from "@emotion/styled";
import { dateInputData, timeInputData } from "const/const";
import { SubmitHandler, useForm } from "react-hook-form";

import type { NextPageWithLayout } from "./_app";

const New: NextPageWithLayout = () => {
  const { register, handleSubmit } = useForm<RoomInfo>();
  const onSubmit: SubmitHandler<RoomInfo> = (data) => console.log(data);
  const featureFlag = false;
  const dateInputs = dateInputData.map(({ id, size, unit, type }) => (
    <GenericInput
      key={id}
      id={id}
      sz={size}
      unit={unit}
      type={type}
      {...register(id)}
    />
  ));

  const timeInputs = timeInputData.map(({ id, size, unit, type }) => (
    <GenericInput
      key={id}
      id={id}
      sz={size}
      unit={unit}
      type={type}
      {...register(id)}
    />
  ));

  return (
    <>
      <Header>새로운 모임 생성하기</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTemplate label="모임 이름은 무엇인가요?">
          <GenericInput
            key="무야호"
            id={"title"}
            sz="large"
            {...register("title")}
          />
        </InputTemplate>
        <InputTemplate label="몇 명이 모이나요?">
          <GenericInput
            key="무야호"
            id={"memberCount"}
            sz="small"
            unit="명"
            {...register("memberCount")}
          />
        </InputTemplate>
        <InputTemplate label="모임이 진행될 날짜는 언제쯤인가요? (최대 2주)">
          {dateInputs}
        </InputTemplate>
        {featureFlag && (
          <InputTemplate label="모임이 진행될 날짜는 언제쯤인가요?">
            {timeInputs}
          </InputTemplate>
        )}
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

New.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
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
