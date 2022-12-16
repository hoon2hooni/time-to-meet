import { Button } from "@components/common";
import { ErrorBox } from "@components/common";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
const Custom404 = () => {
  const router = useRouter();

  return (
    <Container>
      <ErrorBox>
        <p>
          앗! 잘못된 접근이에요.
          <br />
          뒤로 돌아가세요!
        </p>
        <Button color="secondary" onClick={() => router.push("/")}>
          돌아가기
        </Button>
      </ErrorBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export default Custom404;
