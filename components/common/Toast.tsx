import { CheckIcon } from "@components/icons";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import type { FC } from "react";
import { useEffect, useState } from "react";

import Portal from "./Portal";
interface ComponentProps {
  message: string;
  time?: number;
}

const Toast: FC<ComponentProps> = ({ message, time = 1000 }) => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsShow(false);
    }, time);
    return () => clearTimeout(id);
  }, [time]);

  return (
    <Portal>
      <Container isShow={isShow} onClick={() => setIsShow(false)}>
        <Wrapper>
          <Circle>
            <CheckIcon />
          </Circle>
          <p>{message}</p>
        </Wrapper>
      </Container>
    </Portal>
  );
};

export default Toast;
const keyframeFadeIn = keyframes`
  from {
    opacity: 0.2;
    top: 0;
  }
  to {
    opacity: 1;
    top:1.5rem;
  }
`;

const Container = styled.div<{ isShow: boolean }>`
  position: fixed;
  top: 1.5rem;
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 3.6rem;
  font-weight: 700;
  border-radius: 5rem;
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  animation: ${keyframeFadeIn} 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 3.6rem;
  background-color: ${(props) => props.theme.colors.yellow};
  border-radius: 5rem;
  padding: 0 1rem;
  gap: 0.5rem;
`;

const Circle = styled.div`
  display: flex;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;
