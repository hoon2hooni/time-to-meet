import styled from "@emotion/styled";
import type { ComponentProps, FC } from "react";

type ButtonProps = {
  width?: string;
} & ComponentProps<"button">;

type StyledProps = {
  width: string;
};

const Button: FC<ButtonProps> = ({ children, width = "10rem", ...props }) => {
  return (
    <Wrapper width={width} {...props}>
      {children}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button<StyledProps>`
  background-color: ${(props) => props.theme.colors.yellow};
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 0.5rem;
  width: ${(props) => props.width};

  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  border: none;
`;
