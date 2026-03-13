import {
  useState,
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
  type SubmitEvent,
  type ChangeEvent,
} from "react";
import type {
  Habit,
  HabitListItems,
  HabitCollection,
} from "../types/habits.ts";
import useCalendar from "./CalendarContext";
import { v4 as genId } from "uuid";
import { produce, type Draft } from "immer";

const HabitsContext = createContext<HabitListItems | undefined>(undefined);

export function HabitsProvider({ children }: PropsWithChildren) {
  const { activeDate } = useCalendar();
  const [currentHabit, setCurrHabit] = useState("");
  const [editingInput, setEditingInput] = useState("");
  const [habitsCollection, setHabitsCollection] = useState<HabitCollection>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const habitsList: Habit[] =
    habitsCollection[activeDate.toLocaleDateString()] ?? [];

  const onSubmitHabit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHabitsCollection(
      produce((draft: Draft<HabitCollection>) => {
        const currentDate = activeDate.toLocaleDateString();
        if (draft[currentDate] === undefined) {
          draft[currentDate] = [
            { name: currentHabit, completed: false, id: genId() },
          ];
          return;
        }
        draft[currentDate].push({
          name: currentHabit,
          completed: false,
          id: genId(),
        });
      }),
    );
    setCurrHabit("");
  };

  const handleAddedHabit = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrHabit(() => event.target.value);
  };

  const handleDeleteHabit = (id: string) => {
    setHabitsCollection(
      produce((draft: Draft<HabitCollection>) => {
        const dateKey = activeDate.toLocaleDateString();
        if (!draft[dateKey]) return;

        const idx = draft[dateKey].findIndex((habit) => habit.id === id);
        draft[dateKey].splice(idx, 1);
      }),
    );
  };

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleEditingInputValue = (id: string) => {
    setEditingId(id);
    setEditingInput((): string => {
      const dateKey = activeDate.toLocaleDateString();
      if (!habitsCollection[dateKey]) return "";

      let habit = habitsCollection[dateKey].find(
        (item: Habit) => item.id === id,
      );

      if (!habit) return "";
      return habit.name;
    });
  };
  const handleEditingInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingInput(() => e.target.value);
  };

  const handleEdit = (e: SubmitEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setHabitsCollection(
      produce((draft: Draft<HabitCollection>) => {
        const dateKey = activeDate.toLocaleDateString();
        if (!draft[dateKey]) return;

        draft[dateKey].forEach((item) => {
          if (item.id === id) {
            item.name = editingInput;
          }
        });
      }),
    );
    setIsEditing(!isEditing);
  };

  const handleDoneHabit = (id: string) => {
    setHabitsCollection(
      produce((draft: Draft<HabitCollection>) => {
        const dateKey = activeDate.toLocaleDateString();
        if (!draft[dateKey]) return;

        draft[dateKey].forEach((element) => {
          if (element.id === id) {
            element.completed = !element.completed;
          }
        });
      }),
    );
  };

  return (
    <HabitsContext
      value={{
        currentHabit,
        habitsList,
        handleDeleteHabit,
        onSubmitHabit,
        handleAddedHabit,
        handleDoneHabit,
        isEditing,
        handleIsEditing,
        handleEdit,
        handleEditingInputValue,
        handleEditingInput,
        editingInput,
        editingId,
        inputRef,
      }}
    >
      {children}
    </HabitsContext>
  );
}

export default function useHabits() {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("cannot use HabitsProvider");
  }
  return context;
}
