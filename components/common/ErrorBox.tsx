import { Thumbnail } from "@components/icons";
import styled from "@emotion/styled";
import type { FC, ReactNode } from "react";

type ComponentProps = {
  children: ReactNode;
};
const ErrorBox: FC<ComponentProps> = ({ children }) => {
  return (
    <ErrorWrapper>
      <Thumbnail width={60} height={60} />
      {children}
    </ErrorWrapper>
  );
};

export default ErrorBox;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  width: 33rem;
  height: 25.2rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  & > p {
    font-size: 1.4rem;
    margin: 1.6rem 0rem;
    line-height: 1.5;
    text-align: center;
  }
`;
