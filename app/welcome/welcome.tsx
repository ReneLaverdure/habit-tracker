import { useState } from "react";
import Calendar from "../components/calendar";

export function Welcome() {
  const [currDate, setCurrDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(currDate);

  console.log("current date: ", currDate.toLocaleDateString());
  console.log("active date: ", activeDate);
  console.log(
    currDate.toLocaleDateString() === activeDate.toLocaleDateString(),
  );

  const handleActiveDate = (event) => {
    console.log("button pressed");
    console.log(event.target.dataset.date);
    const newDate = event.target.dataset.date;
    setActiveDate((prev) => (prev = new Date(newDate)));
    // event.target.className = "bg-red-500";
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <Calendar
          onSelect={handleActiveDate}
          currentDate={currDate}
          activeDate={activeDate}
        />
      </div>
    </main>
  );
}
