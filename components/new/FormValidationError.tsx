import type { NewEvent } from "@newTypes";
import { ErrorText } from "@ui";
import type { FC } from "react";
import type { FieldErrorsImpl } from "react-hook-form";

type ComponentProps = {
  errors: Partial<FieldErrorsImpl<NewEvent>>;
  fieldName: keyof NewEvent;
  type: "required" | "min" | "maxLength" | "max";
};

const FormValidationError: FC<ComponentProps> = ({
  errors,
  fieldName,
  type,
}) => {
  if (errors[fieldName] && errors[fieldName]?.type === type) {
    return <ErrorText>{errors[fieldName]?.message}</ErrorText>;
  }
  return null;
};

export default FormValidationError;
