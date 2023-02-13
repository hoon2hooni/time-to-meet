import styled from "@emotion/styled";
import type { Attendees } from "@eventsTypes";
import { CheckMark } from "@icons";
import { addDateAndTime, getDayOfWeek, getSelectedDates } from "@lib/days";
import { isInRange } from "@lib/days";
import useUrlEventId from "@lib/hooks/useUrlEventId";
import updateCurrentAttendee from "@lib/updateCurrentAttendee";
import { FC, useReducer } from "react";
type ComponentProps = {
  startDate: Date;
  endDate: Date;
  currentPageIndex: number;
  lastPageIndex: number;
  currentAttendee: string;
  attendees: Attendees;
  startWeekOfMonday: Date;
};

type CheckMarkWrapperProps = {
  checked?: boolean;
};

type checkboxStatus = "unchecked" | "disabled" | "checked";
type checkboxes = {
  status: checkboxStatus;
}[][];

type Checkbox = {
  status: checkboxStatus;
};

type Action = {
  type: "click";
  payload: ActionPayload;
};
type ActionPayload = {
  currentPageIndex: number;
  dayIndex: number;
};

const checkboxReducer = (state: checkboxes, action: Action): checkboxes => {
  switch (action.type) {
    case "click":
      const { currentPageIndex, dayIndex } = action.payload;
      const currentStatus = state[currentPageIndex][dayIndex].status;
      return state.map((s, i) => {
        if (currentPageIndex !== i) {
          return s;
        }
        return s.map((v, j) => {
          if (j !== dayIndex) {
            return v;
          } else {
            return {
              status: currentStatus === "checked" ? "unchecked" : "checked",
            };
          }
        });
      });
    default:
      throw new Error();
  }
};

const Days: FC<ComponentProps> = ({
  startDate,
  currentPageIndex,
  endDate,
  lastPageIndex,
  attendees,
  currentAttendee,
  startWeekOfMonday,
}) => {
  const id = useUrlEventId();
  const [checkStatusArrayState, dispatch] = useReducer(
    checkboxReducer,
    [],
    () => {
      const checkboxes: checkboxes = new Array(lastPageIndex + 1);
      for (let pageIndex = 0; pageIndex < checkboxes.length; pageIndex++) {
        checkboxes[pageIndex] = new Array(7).fill(0).map((_, dayIndex) => {
          return {
            status: isInRange(
              endDate,
              startWeekOfMonday,
              pageIndex,
              dayIndex,
              startDate
            )
              ? "unchecked"
              : "disabled",
          } as Checkbox;
        });
      }
      return checkboxes;
    }
  );

  //Todo onClickHandler만들어야 함
  const onClickCheckbox =
    ({
      currentPageIndex: pageIndex,
      dayIndex,
      status,
    }: ActionPayload & Checkbox) =>
    () => {
      dispatch({
        type: "click",
        payload: { currentPageIndex: pageIndex, dayIndex },
      });
      const selectedDates = getSelectedDates({
        startDate,
        startXIndex: dayIndex,
        pageIndex: currentPageIndex,
      });
      const method = {
        type: status === "checked" ? "delete" : "write",
      } as const;
      updateCurrentAttendee({
        attendees,
        currentAttendee,
        method,
        selectedDates,
        id,
      });
    };
  return (
    <Container>
      {checkStatusArrayState[currentPageIndex].map(({ status }, dayIndex) => {
        return (
          <EachDay key={dayIndex + currentPageIndex * 7}>
            <div>
              {addDateAndTime(startWeekOfMonday, {
                days: dayIndex + currentPageIndex * 7,
              }).getDate()}
            </div>
            <div>
              {getDayOfWeek(
                addDateAndTime(startWeekOfMonday, {
                  days: dayIndex + currentPageIndex * 7,
                })
              )}
            </div>
            {status !== "disabled" ? (
              <CheckBox
                checked={status === "checked"}
                onClick={onClickCheckbox({
                  currentPageIndex,
                  dayIndex,
                  status,
                })}
              >
                {status === "checked" ? <CheckMark /> : null}
              </CheckBox>
            ) : (
              <DisAbledCheckBox />
            )}
          </EachDay>
        );
      })}
    </Container>
  );
};
export default Days;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
  ::after {
    content: "하루종일";
    position: absolute;
    bottom: 0.5rem;
    left: -3.7rem;
    font-size: 1rem;
  }
`;

const EachDay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.3rem;
  padding: 0.6rem 0rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
`;

const CheckBox = styled.div<CheckMarkWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.2rem;
  height: 1.2rem;
  background-color: ${(props) =>
    props.checked ? props.theme.colors.yellow : props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.yellow};
  border-radius: 0.2rem;
  cursor: pointer;
`;

const DisAbledCheckBox = styled(CheckBox)`
  background-color: ${(props) => props.theme.colors.gray};
  border: 1px solid ${(props) => props.theme.colors.gray};
  cursor: not-allowed;
`;
