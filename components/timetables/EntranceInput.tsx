import styled from "@emotion/styled";
import useTemporaryError from "@lib/hooks/useTemporaryError";
import { FC } from "react";
import { useForm } from "react-hook-form";

type ComponentProps = {
  onClickEntrance: (name: string) => string;
};

const EntranceInput: FC<ComponentProps> = ({ onClickEntrance }) => {
  const { register, watch } = useForm();
  const { temporaryError, setTemporaryError } = useTemporaryError(2000);
  return (
    <>
      <Text>이름을 입력하고 캘린더에 입장하세요</Text>
      <InputBox
        placeholder="이름을 입력해주세요."
        {...register("name")}
        autoComplete="off"
      />
      {temporaryError && <ErrorText>{temporaryError}</ErrorText>}
      <Button
        onClick={() => {
          const name = watch("name");
          const errorMessage = onClickEntrance(name);
          if (errorMessage) {
            setTemporaryError(errorMessage);
          }
        }}
      >
        <Text>입장하기</Text>
      </Button>
    </>
  );
};

export default EntranceInput;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.yellow};
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

const ErrorText = styled(Text)`
  color: ${(props) => props.theme.colors.error};
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
