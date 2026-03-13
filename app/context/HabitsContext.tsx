import {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
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
  //
  // const dbRef = useRef<IDBDatabase | null>(null);
  // const [isReady, setIsReady] = useState(false);
  //
  // useEffect(() => {
  //   let db;
  //   const request = indexedDB.open("habitDb", 2);
  //
  //   request.onerror = (event) => {
  //     console.error("indexed db is unable to connect");
  //   };
  //
  //   request.onsuccess = (event) => {
  //     dbRef.current = (event.target as IDBDatabase).result;
  //     setIsReady(true);
  //   };
  //
  //   return () => {};
  // }, []);
  //
  // if (!isReady) return null;

  // console.log(habitsCollection);

  // Stats trackers
  const [completedTotal, setCompletedTotal] = useState(0);
  let habitMap = new Map();

  let totalCompleteDays = 0;
  let habitsSet = new Set();

  const countTotalDay = () => {
    let total = 0;
    for (const day in habitsCollection) {
      let result = habitsCollection[day]?.every(
        (habit) => habit.completed === true,
      );

      habitsCollection[day]?.forEach((item) => {
        if (item.completed) {
          if (!habitMap.has(item.name)) {
            habitMap.set(item.name, 1);
          } else {
            let num = habitMap.get(item.name) + 1;
            habitMap.set(item.name, num);
          }
        }
      });

      if (result) {
        total++;
      }
    }
    totalCompleteDays = total;
  };

  countTotalDay();

  const highestEntry =
    Array.from(habitMap).sort((a, b) => b[1] - a[1])[0] || [];
  const bestHabit = highestEntry[0] || [];
  console.log(bestHabit);

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
    let increase = true;
    setHabitsCollection(
      produce((draft: Draft<HabitCollection>) => {
        const dateKey = activeDate.toLocaleDateString();
        if (!draft[dateKey]) return;

        draft[dateKey].forEach((element) => {
          if (element.id === id) {
            element.completed = !element.completed;

            increase = element.completed;
          }
        });
      }),
    );
    if (increase) {
      setCompletedTotal((prev) => prev + 1);
    } else {
      setCompletedTotal((prev) => prev - 1);
    }
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
        completedTotal,
        totalCompleteDays,
        bestHabit,
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
