import type { SubmitEvent, ChangeEvent, RefObject } from "react";
export interface HabitCollection {
  [date: string]: Habit[] | undefined;
}

export interface Habit {
  name: string;
  completed: boolean;
  id: string;
}

export interface HabitListItems {
  habitsList: Habit[];
  handleDoneHabit: (id: string) => void;
  handleAddedHabit: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDeleteHabit: (id: string) => void;
  currentHabit: string;
  onSubmitHabit: (e: SubmitEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  handleEditingInputValue: (id: string) => void;
  handleIsEditing: () => void;
  handleEdit: (e: SubmitEvent<HTMLFormElement>, id: string) => void;
  handleEditingInput: (e: ChangeEvent<HTMLInputElement>) => void;
  editingInput: string;
  editingId: string;
  inputRef: RefObject<HTMLInputElement | null>;
}
