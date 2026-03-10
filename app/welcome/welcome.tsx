import Calendar from "../components/calendar";
import Habits from "../components/habits";
import HabitsList from "../components/habitsList";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <Calendar />
        <div>
          <Habits />
          <HabitsList />
        </div>
      </div>
    </main>
  );
}
