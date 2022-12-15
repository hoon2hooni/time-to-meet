import type { Size } from "@customTypes";
import styled from "@emotion/styled";
import React from "react";
interface InputProps {
  sz: Size;
}

const sizeMap: Record<Size, string> = {
  small: "10rem",
  middle: "20rem",
  large: "100%",
};

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  unit?: string;
  sz: Size;
}

const GenericInput = React.forwardRef<HTMLInputElement, GenericInputProps>(
  ({ type, sz, unit, onChange, value, ...props }, ref) => {
    return (
      <Container>
        <InputBox
          sz={sz}
          type={type}
          {...props}
          ref={ref}
          autoComplete="off"
          onChange={onChange}
          value={value}
        />
        {unit && <InputUnit>{unit}</InputUnit>}
      </Container>
    );
  }
);

GenericInput.displayName = "GenericInput";

export default GenericInput;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const InputBox = styled.input<InputProps>`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 4.2rem;
  border: none;
  padding: 0 1.6rem;
  width: ${(props) => sizeMap[props.sz]};
  font-size: 1.6rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const InputUnit = styled.span`
  width: 5rem;
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;
