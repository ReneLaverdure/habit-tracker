import { useState, type MouseEvent } from "react";
import { v4 as genId } from "uuid";
import { produce } from "immer";

import Calendar from "../components/calendar";
import Habits from "../components/habits";
import HabitsList from "../components/habitsList";

export function Welcome() {
  const [currDate, setCurrDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(currDate);

  const [currHabit, setCurrHabit] = useState("");
  const [editingInput, setEditingInput] = useState("");
  const [habitsCollection, setHabitsCollection] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  const habitsList = habitsCollection[activeDate.toLocaleDateString()] || [];
  console.log("todays habits list", habitsList);
  console.log(habitsCollection);

  const handleActiveDate = (event: MouseEvent<HTMLButtonElement>) => {
    // console.log("button pressed");
    // console.log(event.target.dataset.date);
    const newDate = event.target.dataset.date;
    setActiveDate((prev) => (prev = new Date(newDate)));
    // event.target.className = "bg-red-500";
  };

  const onSubmitHabit = (e) => {
    e.preventDefault();

    setHabitsCollection(
      produce((draft) => {
        const currentDate = activeDate.toLocaleDateString();
        if (draft[currentDate] === undefined) {
          draft[currentDate] = [
            { name: currHabit, completed: false, id: genId() },
          ];
          return;
        }
        console.log(draft);
        draft[currentDate].push({
          name: currHabit,
          completed: false,
          id: genId(),
        });
      }),
    );
  };

  const handleAddedHabit = (event) => {
    setCurrHabit((prev) => event.target.value);
  };

  const handleDeleteHabit = (id) => {
    setHabitsCollection(
      produce((draft) => {
        const idx = draft[activeDate.toLocaleDateString()].findIndex(
          (habit) => habit.id === id,
        );
        console.log("deleting habit", idx);
        draft[activeDate.toLocaleDateString()].splice(idx, 1);
      }),
    );
  };

  const handleIsEditing = (id) => {
    setIsEditing(!isEditing);
    setEditingId(id);
    setEditingInput((prev) => {
      let habit = habitsCollection[activeDate.toLocaleDateString()].find(
        (item) => item.id === id,
      );
      console.log("single update name", habit);
      return habit.name;
    });
  };

  const handleEditingInput = (e) => {
    setEditingInput((prev) => e.target.value);
  };

  const handleEdit = (id) => {
    setHabitsCollection(
      produce((draft) => {
        draft[activeDate.toLocaleDateString()].forEach((item) => {
          if (item.id === id) {
            item.name = editingInput;
          }
        });
      }),
    );
    setIsEditing(!isEditing);
  };

  const handleDoneHabit = (id) => {
    setHabitsCollection(
      produce((draft) => {
        draft[activeDate.toLocaleDateString()].forEach((element) => {
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
            handleHabbitInput={handleAddedHabit}
            currentHabbit={currHabit}
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
