import { GenericInput, InputTemplate } from "@components/common";
import { FormValidationError } from "@components/new";
import type { NewEvent } from "@newTypes";
import type { FC } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { useFormState } from "react-hook-form";

type ComponentProps = {
  control: Control<NewEvent>;
  register: UseFormRegister<NewEvent>;
};

const NameInput: FC<ComponentProps> = ({ control, register }) => {
  const { errors } = useFormState({ control, name: ["name"] });
  return (
    <InputTemplate label="모임 이름은 무엇인가요?">
      <GenericInput
        key="무야호"
        sz="large"
        {...register("name", {
          required: "모임 이름을 입력해주세요",
          maxLength: {
            value: 16,
            message: "모임 이름은 16자 이하로 입력해주세요.",
          },
        })}
      />
      <FormValidationError errors={errors} fieldName="name" type="required" />
      <FormValidationError errors={errors} fieldName="name" type="maxLength" />
    </InputTemplate>
  );
};

export default NameInput;
