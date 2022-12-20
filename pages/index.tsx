import landingImage from "@assets/images/landing_image.png";
import { Button } from "@components/common";
import { Thumbnail } from "@components/icons";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <Layout>
        <LogoWrapper>
          <Thumbnail width={20} height={20} />
          <LogoName>타임투밋</LogoName>
        </LogoWrapper>
        <Text>매번 날짜 투표 만들지 말고!</Text>
        <Header>
          카톡으로 하는 <br /> 모임시간 자동 매칭
        </Header>
        <LogoBiggerWrapper>
          <Thumbnail />
          <p>타임투밋</p>
        </LogoBiggerWrapper>
        <Button
          size="lg"
          onClick={() => router.push("/new")}
          style={{ marginBottom: "0.7rem" }}
        >
          새로운 모임 만들기
        </Button>
        <Image src={landingImage} width={294} height={515} alt={"모임"} />
        <Footer>
          <FooterLogoWrapper>
            <Thumbnail width={20} height={20} />
            <LogoName style={{ color: "white" }}>타임투밋</LogoName>
          </FooterLogoWrapper>
          <Wrapper>
            <p>ver 1.0</p>
            <StyledLink href="https://open.kakao.com/o/sg36S8Te">
              의견보내기
            </StyledLink>
          </Wrapper>
        </Footer>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 100vw;
  max-width: 42.8rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
  -ms-overflow-style: none;
`;

const Text = styled.p`
  font-size: 2rem;
  margin-bottom: 2.7rem;
  margin-top: 6rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  margin-top: 1.3rem;
  margin-left: 3rem;
`;

const Header = styled.header`
  font-size: 2.6rem;
  color: ${(props) => props.theme.colors.primary};
  line-height: 1.2;
  text-align: center;
  font-weight: 700;

  & > p {
    font-weight: 400;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const LogoBiggerWrapper = styled(LogoWrapper)`
  justify-content: center;
  font-size: 2.6rem;
  align-items: center;
  margin: 0;
  & > p {
    text-align: center;
    margin: 2rem 0rem;
    font-weight: 700;
    margin-left: 1rem;
  }
  margin-bottom: 0rem;
`;

const LogoName = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 2rem;
  margin-left: 0.8rem;
  font-weight: 700;
`;

const FooterLogoWrapper = styled(LogoWrapper)`
  margin: 0;
`;

const Footer = styled.footer`
  display: flex;
  padding: 3.6rem 3.8rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.white};
  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.yellow};
  }
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 1.2rem;
  width: 20rem;
  gap: 0.5rem;
  & > p {
    color: ${(props) => props.theme.colors.white};
  }
`;
