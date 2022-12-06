import Input from "@components/input/Input";
import InputTemplate from "@components/input/InputTemplate";
import Layout from "@components/Layout";
import styled from "@emotion/styled";
import { Size } from "@types";

import type { NextPageWithLayout } from "./_app";
type Inputs = { id: string; size: Size; span?: string; type: string }[];
const New: NextPageWithLayout = () => {
  const dateData: Inputs = [
    { id: "date", size: "middle", span: "일", type: "date" },
    { id: "time", size: "middle", span: "시", type: "date" },
  ];
  const timeData: Inputs = [
    { id: "date", size: "middle", span: "일", type: "time" },
    { id: "time", size: "middle", span: "시", type: "time" },
  ];

  const dateInputs = dateData.map(({ id, size, span, type }) => (
    <Input key={id} id={id} size={size} unit={span} type={type} />
  ));

  const timeInputs = timeData.map(({ id, size, span, type }) => (
    <Input key={id} id={id} size={size} unit={span} type={type} />
  ));

  return (
    <>
      <Header>새로운 모임 생성하기</Header>
      <main>
        <InputTemplate
          inputs={[<Input key="무야호" id="name" size="large" />]}
          label="모임 이름"
        />
        <InputTemplate
          inputs={[<Input key="무야호" id="name" size="small" unit="명" />]}
          label="모임 확정 인원은 몇명일까요?"
        />
        <InputTemplate inputs={dateInputs} label="모임 시간은 몇시쯤인가요?" />
        <InputTemplate
          inputs={timeInputs}
          label="모임이 진행될 날짜는 언제쯤인가요?"
        />
      </main>
      <CtaButton>
        <Text>생성하기</Text>
      </CtaButton>
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

const CtaButton = styled.div`
  background-color: ${(props) => props.theme.colors.title};
  font-size: 2rem;
  font-weight: 700;
  border-radius: 2rem;
  width: 7rem;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;

const Text = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 2rem;
  color: ${(props) => props.theme.colors.white};
`;
