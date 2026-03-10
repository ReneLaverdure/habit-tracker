import useHabits from "~/context/HabitsContext";

export default function Habits() {
  const { handleAddedHabit, currentHabit, onSubmitHabit } = useHabits();
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl mb-2">Habits tracker</h1>
      <div>
        <form onSubmit={onSubmitHabit}>
          <input
            value={currentHabit}
            onChange={(e) => handleAddedHabit(e)}
            className="bg-white rounded-2xl text-black p-2"
            type="text"
          />
          <button
            className="ml-3 p-2 px-5 rounded-2xl outline-white outline-3"
            type="submit"
          >
            Add Habbit
          </button>
        </form>
      </div>
    </div>
  );
}
