import GenericInput from "@components/input/GenericInput";
import type { RoomInfo } from "@customTypes";
import type { FC } from "react";
import type { ChangeEvent } from "react";
import type { Control } from "react-hook-form";
import { Controller, useWatch } from "react-hook-form";

type ComponentProps = {
  control: Control<RoomInfo>;
};
const MemberCountInput: FC<ComponentProps> = ({ control }) => {
  const memberCount = useWatch({
    control,
    name: "memberCount",
  });

  const transform = {
    input: (value: number) =>
      isNaN(value) || value === 0 ? "" : value.toString(),
    output: (e: ChangeEvent<HTMLInputElement>) => {
      const output = parseInt(e.target.value, 10);
      return isNaN(output) ? 0 : output;
    },
  };

  return (
    <>
      <Controller
        name={"memberCount"}
        control={control}
        render={({ field }) => (
          <GenericInput
            {...field}
            key="무야호"
            id={"memberCount"}
            sz="small"
            unit="명"
            onChange={(e) => field.onChange(transform.output(e))}
            value={transform.input(field.value)}
          />
        )}
      />
    </>
  );
};

export default MemberCountInput;
