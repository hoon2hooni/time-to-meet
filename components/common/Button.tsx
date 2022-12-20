import styled from "@emotion/styled";
import type { ComponentProps, FC } from "react";

type ButtonProps = {
  color?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  width?: string;
} & ComponentProps<"button">;

type StyledProps = Partial<ButtonProps>;

const Button: FC<ButtonProps> = ({
  children,
  width = "10rem",
  color = "primary",
  size = "md",
  ...props
}) => {
  return (
    <Wrapper color={color} size={size} {...props}>
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) =>
    props.size === "sm"
      ? "0.7rem 1.5rem"
      : props.size === "md"
      ? "1.6rem 2.1rem"
      : "1.7rem 3.2rem"};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #896300;
    color: ${(props) => props.theme.colors.white};
  }
  transition: all 0.1s ease-in-out;
`;
