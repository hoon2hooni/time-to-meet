import styled from "@emotion/styled";
import type { ComponentProps, FC } from "react";

type ButtonProps = {
  width?: string;
  color?: "primary" | "secondary";
} & ComponentProps<"button">;

type StyledProps = {
  width: string;
  color: "primary" | "secondary";
};

const Button: FC<ButtonProps> = ({
  children,
  width = "10rem",
  color = "primary",
  ...props
}) => {
  return (
    <Wrapper width={width} color={color} {...props}>
      {children}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button<StyledProps>`
  background-color: ${(props) =>
    props.color === "primary"
      ? props.theme.colors.yellow
      : props.theme.colors.gray};
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
