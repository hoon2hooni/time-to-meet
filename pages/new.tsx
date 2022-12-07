import Input from "@components/input/Input";
import InputTemplate from "@components/input/InputTemplate";
import Layout from "@components/Layout";
import styled from "@emotion/styled";
import type { RoomInfo } from "@types";
import { dateInputData, timeInputData } from "const/const";
import { SubmitHandler, useForm } from "react-hook-form";

import type { NextPageWithLayout } from "./_app";

const New: NextPageWithLayout = () => {
  const { register, handleSubmit } = useForm<RoomInfo>();
  const onSubmit: SubmitHandler<RoomInfo> = (data) => console.log(data);

  const dateInputs = dateInputData.map(({ id, size, unit, type }) => (
    <Input
      key={id}
      id={id}
      size={size}
      unit={unit}
      type={type}
      register={register}
    />
  ));

  const timeInputs = timeInputData.map(({ id, size, unit, type }) => (
    <Input
      key={id}
      id={id}
      size={size}
      unit={unit}
      type={type}
      register={register}
    />
  ));

  return (
    <>
      <Header>새로운 모임 생성하기</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTemplate
          inputs={[
            <Input
              key="무야호"
              id={"title"}
              size="large"
              register={register}
            />,
          ]}
          label="모임 이름"
        />
        <InputTemplate
          inputs={[
            <Input
              key="무야호"
              id={"memberCount"}
              size="small"
              unit="명"
              register={register}
            />,
          ]}
          label="모임 확정 인원은 몇명일까요?"
        />

        <InputTemplate inputs={dateInputs} label="모임 시간은 몇시쯤인가요?" />
        <InputTemplate
          inputs={timeInputs}
          label="모임이 진행될 날짜는 언제쯤인가요?"
        />
        <CtaButton type="submit">
          <Text>생성하기</Text>
        </CtaButton>
      </form>
    </>
  );
};

New.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default New;

const Header = styled.header`
  color: ${(props) => props.theme.colors.title};
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  font-weight: 700;
  height: 5.2rem;
  margin-bottom: 2.4rem;
`;

const CtaButton = styled.button`
  background-color: ${(props) => props.theme.colors.title};
  font-size: 2rem;
  font-weight: 700;
  border-radius: 2rem;
  width: 8rem;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  border: none;
`;

const Text = styled.span`
  font-size: 1rem;
  font-weight: 700;
  border-radius: 2rem;
  color: ${(props) => props.theme.colors.white};
`;
