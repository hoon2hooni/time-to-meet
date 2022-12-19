import { GenericInput, InputTemplate } from "@components/common";
import { FormValidationError } from "@components/new";
import type { NewEvent } from "@newTypes";
import type { FC } from "react";
import type { ChangeEvent } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useFormState } from "react-hook-form";

type ComponentProps = {
  control: Control<NewEvent>;
};

const MaxCapacityInput: FC<ComponentProps> = ({ control }) => {
  const { errors } = useFormState({ control, name: ["maxCapacity"] });
  const transform = {
    input: (value: number) =>
      isNaN(value) //
        ? ""
        : value === 0
        ? "0"
        : value.toString(),
    output: (e: ChangeEvent<HTMLInputElement>) => {
      const output = parseInt(e.target.value, 10);
      return isNaN(output) ? "" : output;
    },
  };

  return (
    <InputTemplate label="몇 명이 모이나요?">
      <Controller
        name={"maxCapacity"}
        control={control}
        rules={{
          required: {
            value: true,
            message: "인원을 입력해주세요.",
          },
          min: {
            value: 1,
            message: "인원은 1명 이상이어야 합니다.",
          },
        }}
        render={({ field }) => (
          <>
            <GenericInput
              {...field}
              key="무야호"
              id={"maxCapacity"}
              sz="small"
              unit="명"
              onChange={(e) => field.onChange(transform.output(e))}
              value={transform.input(field.value)}
            />
            <FormValidationError
              errors={errors}
              fieldName="maxCapacity"
              type="required"
            />
            <FormValidationError
              errors={errors}
              fieldName="maxCapacity"
              type="min"
            />
          </>
        )}
      />
    </InputTemplate>
  );
};

export default MaxCapacityInput;
