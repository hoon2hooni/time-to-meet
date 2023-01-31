import styled from "@emotion/styled";
import type { ComponentProps, FC } from "react";
type ButtonProps = {
  color?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
} & ComponentProps<"button">;

type StyledProps = Partial<ButtonProps>;

const Button: FC<ButtonProps> = ({
  children,
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
  font-size: ${(props) => (props.size === "sm" ? "1.2rem" : "1.6rem")};
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

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.5;
      transition: all 0.1s ease-in-out;
    }
  }

  &:active {
    opacity: 0.5;
    scale: 0.95;
  }

  &:disabled {
    opacity: 0.5;
  }
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
