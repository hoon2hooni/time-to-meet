import styled from "@emotion/styled";
import { Size } from "@types";

interface Props {
  id: string;
  size: Size;
  type?: string;
  unit?: string;
}

interface InputProps {
  sz: Size;
}

const sizeMap: Record<Size, string> = {
  small: "10rem",
  middle: "13.5rem",
  large: "100%",
};

export default function Input({ id, size, unit, type = "text" }: Props) {
  return (
    <Wrapper>
      <InputBox id={id} type={type} sz={size} />
      <InputUnit>{unit}</InputUnit>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const InputBox = styled.input<InputProps>`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 4.2rem;
  border: none;
  padding: 0 1.6rem;
  width: ${(props) => sizeMap[props.sz]};
`;

const InputUnit = styled.span`
  width: 5rem;
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;
