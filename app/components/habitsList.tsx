import type { HabitListItems } from "~/types/habits";
import useHabits from "~/context/HabitsContext";

export default function HabitsList() {
  const {
    habitsList,
    handleDoneHabit,
    handleDeleteHabit,
    isEditing,
    handleEdit,
    handleIsEditing,
    handleEditingInputValue,
    handleEditingInput,
    editingInput,
    editingId,
    inputRef,
  } = useHabits();
  const viewMode = (id: string) => (
    <div>
      <button
        className="mr-3 text-amber-500 font-bold"
        onClick={() => {
          handleIsEditing();
          handleEditingInputValue(id);
        }}
      >
        Edit
      </button>
      <button
        className="text-green-500 font-bold"
        onClick={() => handleDoneHabit(id)}
      >
        Done
      </button>
    </div>
  );

  return (
    <div className="block text-black">
      {habitsList.map((habit) => {
        if (habit.completed) {
          return (
            <div
              className="flex justify-between bg-green-200 p-2 mt-3 rounded-xl text-green-600"
              key={habit.id}
            >
              <p>{habit.name}</p>
              <div>
                <button
                  className="text-green-500 font-bold"
                  onClick={() => handleDoneHabit(habit.id)}
                >
                  Done
                </button>
              </div>
            </div>
          );
        }
        return (
          <div
            key={habit.id}
            className="flex justify-between bg-white p-2 rounded-xl my-3"
          >
            {isEditing && editingId === habit.id ? (
              <form
                className="flex justify-between w-full"
                onSubmit={(e) => {
                  console.log("submit");
                  handleEdit(e, habit.id);
                }}
              >
                <input
                  ref={(ele) => {
                    inputRef.current = ele;
                    ele?.focus();
                  }}
                  onBlur={() => setTimeout(() => handleIsEditing(), 150)}
                  value={editingInput}
                  onChange={(e) => handleEditingInput(e)}
                  type="text"
                  className="bg-white  focus:outline-0"
                />
                <div className="ml-auto">
                  <button
                    className="mr-2 font-bold text-amber-600"
                    type="submit"
                  >
                    Edit
                  </button>
                  <button
                    className=" text-red-600 font-bold"
                    onClick={() => {
                      handleIsEditing();
                      handleDeleteHabit(habit.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </form>
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
