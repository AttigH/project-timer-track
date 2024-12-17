import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../context/CyclesContext";

const newCycleFormValidantionSchema = zod.object({
  task: zod.string().min(1, "Report the task"),
  minutesAmount: zod
    .number()
    .min(5, "The cycle must be at least 5 minutes long.")
    .max(60, "The cycle must be a maximum of 60 minutes"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidantionSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidantionSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");

  const isSubmiteDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            Interrupt
            <HandPalm size={24} />
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmiteDisabled} type="submit">
            Start
            <Play size={24} />
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
