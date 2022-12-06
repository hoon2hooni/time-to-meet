import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import styled from "@emotion/styled";
import type { Size } from "@types";

import Input from "./Input";
interface Props {
  label: string;
  inputs?: EmotionJSX.Element[];
}

export default function InputTemplate({ label, inputs }: Props) {
  return (
    <Container>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <InputWrapper>{inputs}</InputWrapper>
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
