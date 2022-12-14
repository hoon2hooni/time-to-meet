import styled from "@emotion/styled";
import type { FC, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 40px 20px 20px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

const Content = styled.div`
  max-width: 30rem;
  width: 70%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  gap: 2rem;
  border-radius: 2rem;
`;

export default Modal;
