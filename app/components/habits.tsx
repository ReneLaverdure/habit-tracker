import type { SubmitEvent } from "react";

interface Habits {
  handleHabitInput: Function;
  currentHabit: string;
  onSubmitHabit: (e: SubmitEvent<HTMLFormElement>) => void;
}
export default function Habits({
  handleHabitInput,
  currentHabit,
  onSubmitHabit,
}: Habits) {
  return (
    <div className="flex flex-col">
      <h1>Habits tracker</h1>
      <div>
        <form onSubmit={onSubmitHabit}>
          <input
            value={currentHabit}
            onChange={(e) => handleHabitInput(e)}
            className="bg-white rounded-2xl text-black p-2"
            type="text"
          />
          <button type="submit">add Habbit</button>
        </form>
      </div>
    </div>
  );
}
