import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

import { useContext } from "react";
import { CyclesContext } from "../../../../context/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();
  return (
    <FormContainer>
      <label htmlFor="task">I will work on </label>
      <TaskInput
        id="task"
        list="task-suggestion"
        disabled={!!activeCycle}
        placeholder="Name your project"
        {...register("task")}
      />
      <datalist id="task-suggestion">
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
      </datalist>

      <label htmlFor="">During </label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>Minutes.</span>
    </FormContainer>
  );
}
