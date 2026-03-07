import type { SubmitEvent, ChangeEvent, RefObject } from "react";
export interface HabitCollection {
  [date: string]: Habit[] | undefined;
}

export interface Habit {
  name: string;
  completed: boolean;
  id: string;
}

export interface HabitsForm {
  handleHabitInput: Function;
  currentHabit: string;
  onSubmitHabit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export interface HabitListItems {
  habits: Habit[];
  handleDone: (id: string) => void;
  handleDelete: (id: string) => void;

  isEditing: boolean;
  handleEditingInputValue: (id: string) => void;
  handleEditing: () => void;
  handleEdit: (e: SubmitEvent<HTMLFormElement>, id: string) => void;
  handleEditingInput: (e: ChangeEvent<HTMLInputElement>) => void;
  editingInput: string;
  editingId: string;
  inputRef: RefObject<HTMLInputElement | null>;
}
