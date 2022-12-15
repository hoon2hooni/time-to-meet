import styled from "@emotion/styled";
import type { FC, ReactNode } from "react";

type ComponentProps = {
  children: ReactNode;
};
const ErrorText: FC<ComponentProps> = ({ children }) => {
  return <Span>{children}</Span>;
};

const Span = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.error};
`;

export default ErrorText;
