import { GenericInput, InputTemplate } from "@components/common";
import { FormValidationError } from "@components/new";
import { getMaxDate, notWithinThreeWeeks } from "@lib/days";
import type { NewEvent } from "@newTypes";
import type { FC } from "react";
import { useEffect } from "react";
import type {
  Control,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useFormState, useWatch } from "react-hook-form";

type ComponentProps = {
  control: Control<NewEvent>;
  register: UseFormRegister<NewEvent>;
  setValue: UseFormSetValue<NewEvent>;
};

const DateInputs: FC<ComponentProps> = ({ control, setValue, register }) => {
  const { errors } = useFormState({ control, name: ["startDate", "endDate"] });
  const startDate = useWatch({
    control,
    name: "startDate",
  });

  const endDate = useWatch({
    control,
    name: "endDate",
  });

  useEffect(() => {
    if (startDate && endDate) {
      if (notWithinThreeWeeks(startDate, endDate)) {
        setValue("endDate", "");
      }
    }
  }, [startDate, endDate, setValue]);

  return (
    <InputTemplate label="모임이 진행될 날짜는 언제쯤인가요? (최대 3주)">
      <GenericInput
        sz="middle"
        unit="부터"
        type="date"
        {...register("startDate", { required: "시작일을 입력해주세요." })}
      />
      <FormValidationError
        errors={errors}
        fieldName="startDate"
        type="required"
      />
      <GenericInput
        sz="middle"
        unit="까지"
        type="date"
        min={startDate}
        max={getMaxDate(startDate)}
        {...register("endDate", { required: "종료일을 입력해주세요." })}
      />
      <FormValidationError
        errors={errors}
        fieldName="endDate"
        type="required"
      />
    </InputTemplate>
  );
};

export default DateInputs;
