import { createContext, useContext } from "react";

const HabitsContext = createContext();

export function HabitsProvider({ children }) {
  const habits = "habits";
  return <HabitsContext value={habits}>{children}</HabitsContext>;
}

export default function useHabits() {
  return useContext(HabitsContext);
}
