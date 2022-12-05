import Layout from "@components/Layout";
import styled from "@emotion/styled";

import type { NextPageWithLayout } from "./_app";
const New: NextPageWithLayout = () => {
  return (
    <>
      <Header>새로운 모임 생성하기</Header>
      <main>
        <InputContainer>
          <Label>모임 이름은 무엇인가요?</Label>
          <Input />
        </InputContainer>
        <InputContainer>
          <Label>몇 명이 모이나요?</Label>
          <Input />
        </InputContainer>
        <InputContainer>
          <Label>모임이 진행될 날짜는 언제쯤인가요?</Label>
          <InputMulti>
            <SmallInput />
            <SmallInputText>부터</SmallInputText>
            <SmallInput />
            <SmallInputText>까지</SmallInputText>
          </InputMulti>
        </InputContainer>
        <InputContainer>
          <Label>모임이 시간은 몇시쯤인가요?</Label>
          <InputMulti>
            <SmallInput />
            <SmallInputText>시 부터</SmallInputText>
            <SmallInput />
            <SmallInputText>시 까지</SmallInputText>
          </InputMulti>
        </InputContainer>
        <InputContainer>
          <Label>모임 소요 시간은 어떻게 되나요?</Label>
          <InputMulti>
            <SmallInput />
            <SmallInputText>시간</SmallInputText>
          </InputMulti>
        </InputContainer>
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

const Label = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Input = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 4.2rem;
`;

const InputContainer = styled.div`
  margin-bottom: 5rem;
`;

const InputMulti = styled.div`
  display: flex;
  align-items: center;
`;

const SmallInput = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  width: 9rem;
  margin-right: 0.5rem;
  height: 4.2rem;
`;

const SmallInputText = styled.div`
  width: 5rem;
  font-size: 1.2rem;
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
