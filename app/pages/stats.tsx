import useHabits from "~/context/HabitsContext";

export default function Stats() {
  const { completedTotal, totalCompleteDays, bestHabit } = useHabits();

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <h1 className="text-3xl">Stats page</h1>
        <div>
          <h2>Total completed Habits: {completedTotal}</h2>
          <h2>Total completed Days: {totalCompleteDays}</h2>
          <h2>Best habit: {bestHabit}</h2>
        </div>
      </div>
    </main>
  );
}
