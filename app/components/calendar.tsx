import type { Calendar } from "../types/calendar.ts";
import useCalendar from "~/context/CalendarContext.js";

export default function Cadendar({ activeDate }: Calendar) {
  const {
    currentDate,
    currentMonth,
    handleActiveDate,
    handlePrevMonth,
    handleNextMonth,
    days,
    months,
  } = useCalendar();

  return (
    <div>
      <header className="flex justify-between">
        <button onClick={handlePrevMonth}>previous</button>
        <h1>{months[currentMonth]}</h1>
        <button onClick={handleNextMonth}>next</button>
      </header>

      <div className="grid grid-cols-7 gap-3 place-content-center text-center">
        <h4>Sunday</h4>
        <h4>Monday</h4>
        <h4>Tuesday</h4>
        <h4>Wednesday</h4>
        <h4>Thursday</h4>
        <h4>Friday</h4>
        <h4>Saturday</h4>

        {days.map((day: Date) => {
          if (day.getMonth() !== currentMonth) {
            return (
              <div key={day.toLocaleDateString()} className="text-gray-600">
                <p className="text-center rounded-lg p-2">{day.getDate()}</p>
              </div>
            );
          }
          if (day.toLocaleDateString() === currentDate.toLocaleDateString()) {
            return (
              <div
                data-date={day}
                key={day.toLocaleDateString()}
                onClick={(e) => handleActiveDate(e)}
                className="bg-amber-400 text-center rounded-lg p-2"
              >
                {day.getDate()}
              </div>
            );
          }

          if (day.toLocaleDateString() === activeDate.toLocaleDateString()) {
            return (
              <div
                data-date={day}
                key={day.toLocaleDateString()}
                onClick={(e) => handleActiveDate(e)}
                className="bg-red-500 rounded-lg p-2 text-center"
              >
                {day.getDate()}
              </div>
            );
          }
          return (
            <div
              data-date={day}
              key={day.toLocaleDateString()}
              onClick={(e) => handleActiveDate(e)}
              className="text-center rounded-lg p-2"
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
