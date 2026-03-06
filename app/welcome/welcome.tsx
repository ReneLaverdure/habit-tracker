import {
  useState,
  type ChangeEvent,
  type SubmitEvent,
  type MouseEvent,
} from "react";
import { v4 as genId } from "uuid";
import { produce, type Draft } from "immer";

import Calendar from "../components/calendar";
import Habits from "../components/habits";
import HabitsList from "../components/habitsList";

interface HabitCollection {
  [date: string]: Habit[] | undefined;
}

interface Habit {
  name: string;
  completed: boolean;
  id: string;
}

export function Welcome() {
  const currDate = new Date();
  const [activeDate, setActiveDate] = useState<Date>(currDate);

  const [currHabit, setCurrHabit] = useState("");
  const [editingInput, setEditingInput] = useState("");
  const [habitsCollection, setHabitsCollection] = useState<HabitCollection>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  const habitsList: Habit[] =
    habitsCollection[activeDate.toLocaleDateString()] ?? [];

  const handleActiveDate = (event: MouseEvent<HTMLButtonElement>) => {
    const newDate = event.currentTarget.dataset.date;
    if (!newDate) return;
    setActiveDate(() => new Date(newDate));
  };

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

  const handleIsEditing = (id: string) => {
    setIsEditing(!isEditing);
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

  const handleEdit = (id: string) => {
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
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <Calendar
          onSelect={handleActiveDate}
          currentDate={currDate}
          activeDate={activeDate}
        />
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
            isEditing={isEditing}
            handleEditing={handleIsEditing}
            handleEdit={handleEdit}
            handleEditingInput={handleEditingInput}
            editingInput={editingInput}
            editingId={editingId}
          />
        </div>
      </div>
    </main>
  );
}
