export default function Habits({
  handleHabbitInput,
  currentHabbit,
  onSubmitHabit,
}) {
  return (
    <div className="flex flex-col">
      <h1>Habits tracker</h1>
      <div>
        <form onSubmit={onSubmitHabit}>
          <input
            value={currentHabbit}
            onChange={(e) => handleHabbitInput(e)}
            className="bg-white rounded-2xl text-black p-2"
            type="text"
          />
          <button type="submit">add Habbit</button>
        </form>
      </div>
    </div>
  );
}
