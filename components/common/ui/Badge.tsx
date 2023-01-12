import styled from "@emotion/styled";
import type { ReactNode } from "react";
type BadgeProps = {
  children: ReactNode;
};
export default function Badge({ children }: BadgeProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightOrange};
  color: ${(props) => props.theme.colors.orange};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 1.8rem;
  font-size: 1rem;
  border-radius: 0.5rem;
`;
