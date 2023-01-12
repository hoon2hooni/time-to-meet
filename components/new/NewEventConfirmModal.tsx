import styled from "@emotion/styled";
import { LoadingButtonSpinner } from "@icons";
import type { NewEvent } from "@newTypes";
import { Button } from "@ui";
import { EventInfo, Modal } from "@ui";
import type { FC } from "react";
import type { Control } from "react-hook-form";
import { useWatch } from "react-hook-form";
type ComponentProps = {
  control: Control<NewEvent>;
  onSubmitData: (data: NewEvent) => Promise<void>;
  onCloseModal: () => void;
  isLoading: boolean;
};

const NewEventConfirmModal: FC<ComponentProps> = ({
  control,
  onCloseModal,
  onSubmitData,
  isLoading,
}) => {
  const startDate = useWatch({
    control,
    name: "startDate",
  });

  const endDate = useWatch({
    control,
    name: "endDate",
  });
  const name = useWatch({
    control,
    name: "name",
  });

  const maxCapacity = useWatch({
    control,
    name: "maxCapacity",
  });

  return (
    <Modal>
      <EventInfo
        name={name}
        maxCapacity={maxCapacity}
        startDate={startDate}
        endDate={endDate}
      />
      <TextWrapper>이대로 모임을 생성할까요?</TextWrapper>
      <ButtonWrapper>
        <Button color="secondary" onClick={onCloseModal} disabled={isLoading}>
          수정하기
        </Button>
        <Button
          onClick={() =>
            onSubmitData({ name, maxCapacity, startDate, endDate })
          }
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingWrapper>
              <LoadingButtonSpinner />
            </LoadingWrapper>
          ) : (
            "생성하기"
          )}
        </Button>
      </ButtonWrapper>
    </Modal>
  );
};

export default NewEventConfirmModal;

const TextWrapper = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
`;

const LoadingWrapper = styled.div`
  width: 5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 22rem;
  justify-content: space-between;
`;
