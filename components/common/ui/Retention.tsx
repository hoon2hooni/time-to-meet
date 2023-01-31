import styled from "@emotion/styled";
import { Thumbnail } from "@icons";
import { Button } from "@ui";
import Link from "next/link";
import { useRouter } from "next/router";
const Retention = () => {
  const router = useRouter();
  return (
    <Container>
      <MarginText>
        일정을 매칭하고 싶은
        <br />
        모임이 더 있으신가요?
      </MarginText>
      <Button onClick={() => router.push("/")}>새로운 모임 만들기</Button>
      <Wrapper>
        <Thumbnail width={16} height={16} />
        <Text>타임투밋</Text>
      </Wrapper>
      <StyledLink href="https://open.kakao.com/o/sg36S8Te">
        에 의견보내기!
      </StyledLink>
    </Container>
  );
};

const Container = styled.div`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24rem;
  background-color: ${(props) => props.theme.colors.primary};
`;

const Text = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  line-height: 1.3;
`;

const MarginText = styled(Text)`
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  width: 9.5rem;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const StyledLink = styled(Link)`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.yellow};
  }
  cursor: pointer;
`;

export default Retention;
