import styled from "@emotion/styled";
import { FC } from "react";
import { useForm } from "react-hook-form";

type ComponentProps = {
  onClickEntrance: (name: string) => void;
};

const EntranceInput: FC<ComponentProps> = ({ onClickEntrance }) => {
  const { register, watch } = useForm();

  return (
    <>
      <div>이름을 입력하고 캘린더에 입장하세요</div>
      <InputBox
        placeholder="이름을 입력해주세요."
        {...register("name")}
        autoComplete="false"
      />
      <Button
        onClick={() => {
          const name = watch("name");
          onClickEntrance(name);
        }}
      >
        <Text>입장하기</Text>
      </Button>
    </>
  );
};

export default EntranceInput;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.title};
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 0.5rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  border: none;
`;

const Text = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
`;

const InputBox = styled.input`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 4.2rem;
  border: none;
  padding: 0 1.6rem;
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
`;
