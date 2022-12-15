import ErrorText from "@components/common/ErrorText";
import type { NewEvent } from "@customTypes";
import type { FC } from "react";
import type { FieldErrorsImpl } from "react-hook-form";

type ComponentProps = {
  errors: Partial<FieldErrorsImpl<NewEvent>>;
  fieldName: keyof NewEvent;
  type: "required" | "min" | "maxLength";
};

const InputError: FC<ComponentProps> = ({ errors, fieldName, type }) => {
  if (errors[fieldName] && errors[fieldName]?.type === type) {
    return <ErrorText>{errors[fieldName]?.message}</ErrorText>;
  }
  return null;
};

export default InputError;
