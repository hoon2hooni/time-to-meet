import styled from "@emotion/styled";
import type { Size } from "@types";

import Input from "./Input";
interface Props {
  label: string;
  size: Size;
  type?: string;
}

export default function MultiInput({ label, size, type }: Props) {
  return (
    <Container>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <InputWrapper>
        <Input id={label} size={size} span={"부터"} type={type} />
        <Input id={label} size={size} span={"까지"} type={type} />
      </InputWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

const InputLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;
