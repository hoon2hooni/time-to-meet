import type { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import styled from "@emotion/styled";
import type { ReactNode } from "react";
interface Props {
  label: string;
  inputs?: EmotionJSX.Element[];
  children: ReactNode;
}

export default function InputTemplate({ label, children }: Props) {
  return (
    <Container>
      <Label htmlFor={label}>{label}</Label>
      <InputLayout>{children}</InputLayout>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
