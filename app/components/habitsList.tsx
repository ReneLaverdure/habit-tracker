export default function HabitsList({
  habits,
  handleDone,
  handleDelete,
  handleEditing,
  isEditing,
  handleEdit,
  handleEditingInput,
  editingInput,
  editingId,
}) {
  console.log("todays habits", habits);
  console.log(isEditing);
  const viewMode = (id) => (
    <div>
      <button className="mr-3" onClick={() => handleEditing(id)}>
        Edit
      </button>
      <button onClick={() => handleDone(id)}>Done</button>
    </div>
  );

  return (
    <div className="block text-black">
      {habits.map((habit, idx) => {
        console.log(editingInput);
        if (habit.completed) {
          return (
            <div
              className="flex justify-between bg-yellow-100 p-2 rounded-xl text-green-500"
              key={habit.id}
            >
              <p>{habit.name}</p>
              <div>
                <button onClick={() => handleDelete(habit.id)}>X</button>
                <button onClick={() => handleDone(habit.id)}>Done</button>
              </div>
            </div>
          );
        }
        return (
          <div
            key={habit.id}
            className="flex justify-between bg-yellow-100 p-2 rounded-xl"
          >
            {isEditing && editingId === habit.id ? (
              <>
                <input
                  value={editingInput}
                  onChange={(e) => handleEditingInput(e)}
                  type="text"
                  className="bg-red-400"
                />
                <button onClick={() => handleEdit(habit.id)}>change</button>
              </>
            ) : (
              <>
                <p className="mr-5">{habit.name}</p>
                {viewMode(habit.id)}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
