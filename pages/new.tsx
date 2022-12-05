import MultiInput from "@components/input/MultiInput";
import SingleInput from "@components/input/SingleInput";
import Layout from "@components/Layout";
import styled from "@emotion/styled";

import type { NextPageWithLayout } from "./_app";
const New: NextPageWithLayout = () => {
  return (
    <>
      <Header>새로운 모임 생성하기</Header>
      <main>
        <SingleInput label="모임 이름" size="large" />
        <SingleInput label="몇 명이 모이나요?" size="middle" span={"명"} />
        <SingleInput
          label="모임 확정 인원은 몇명일까요?"
          size="middle"
          span={"명"}
        />
        <MultiInput
          size="middle"
          label="모임이 진행될 날짜는 언제쯤인가요?"
          type={"date"}
        />
        <MultiInput
          size="middle"
          label="모임 시간은 몇시쯤인가요?"
          type={"time"}
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
