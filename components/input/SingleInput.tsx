import styled from "@emotion/styled";
import type { Size } from "@types";

import Input from "./Input";
interface Props {
  label: string;
  size: Size;
  span?: string;
}

export default function SingleInput({ label, size, span }: Props) {
  return (
    <InputContainer>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Input id={label} size={size} span={span} />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

const InputLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
