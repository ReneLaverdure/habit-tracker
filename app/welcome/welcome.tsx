import { useState, type ChangeEvent, type SubmitEvent, useRef } from "react";
import { v4 as genId } from "uuid";
import { produce, type Draft } from "immer";

import Calendar from "../components/calendar";
import Habits from "../components/habits";
import HabitsList from "../components/habitsList";

import useCalendar from "~/context/CalendarContext";

import type { Habit, HabitCollection } from "../types/habits.ts";

export function Welcome() {
  const { activeDate } = useCalendar();

  const [currHabit, setCurrHabit] = useState("");
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
            { name: currHabit, completed: false, id: genId() },
          ];
          return;
        }
        draft[currentDate].push({
          name: currHabit,
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
  {
  }
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

  const editingProps = {
    isEditing,
    handleEditing: handleIsEditing,
    handleEdit,
    handleEditingInputValue,
    handleEditingInput,
    editingInput,
    editingId,
    inputRef,
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <Calendar activeDate={activeDate} />
        <div>
          <Habits
            handleHabitInput={handleAddedHabit}
            currentHabit={currHabit}
            onSubmitHabit={onSubmitHabit}
          />
          <HabitsList
            habits={habitsList}
            handleDone={handleDoneHabit}
            handleDelete={handleDeleteHabit}
            {...editingProps}
          />
        </div>
      </div>
    </main>
  );
}
