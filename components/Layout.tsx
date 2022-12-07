import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  padding: 3rem 4rem;
  width: 100%;
  height: 100%;
`;
export default Layout;
