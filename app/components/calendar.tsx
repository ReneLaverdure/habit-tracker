import { useState } from "react";

export default function Cadendar({ onSelect, currentDate, activeDate }) {
  console.log("calendar");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currDate, setCurrDate] = useState(new Date());

  // const monthIdx = currDate.getMonth();
  const [currMonth, setCurrMonth] = useState(currDate.getMonth());
  const year = currDate.getFullYear();

  const handleNextMonth = () => {
    setCurrMonth((prev) => {
      if (prev === 11) {
        return 0;
      }
      return prev + 1;
    });
  };
  const handlePrevMonth = () => {
    setCurrMonth((prev) => {
      if (prev === 0) {
        return 11;
      }
      return prev - 1;
    });
  };
  const getDaysInMonth = (month: number, year: number) => {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  let days = getDaysInMonth(currMonth, year);
  console.log(days);
  console.log(months[currMonth]);
  console.log(days[0].getDay());

  let missingFront = days[0].getDay();
  console.log(missingFront);
  let holdingDate = new Date(days[0]);
  console.log("HOLDIng date", holdingDate);

  while (missingFront) {
    holdingDate.setDate(holdingDate.getDate() - 1);
    console.log(holdingDate);
    days.unshift(new Date(holdingDate));
    missingFront--;
  }

  console.log(days);

  return (
    <div>
      <header className="flex justify-between">
        <button onClick={handlePrevMonth}>previous</button>
        <h1>{months[currMonth]}</h1>
        <button onClick={handleNextMonth}>next</button>
      </header>

      <div className="grid grid-cols-7 gap-1">
        <h4>Sunday</h4>
        <h4>Monday</h4>
        <h4>Tuesday</h4>
        <h4>Wednesday</h4>
        <h4>Thursday</h4>
        <h4>Friday</h4>
        <h4>Saturday</h4>

        {days.map((day, idx) => {
          if (day.getMonth() !== currMonth) {
            return (
              <div
                key={day.toLocaleDateString()}
                onClick={(e) => onSelect(e)}
                className="text-gray-600"
              >
                {day.getDate()}
              </div>
            );
          }
          if (day.toLocaleDateString() === currentDate.toLocaleDateString()) {
            return (
              <div
                key={day.toLocaleDateString()}
                onClick={(e) => onSelect(e)}
                className="bg-amber-400"
              >
                {day.getDate()}
              </div>
            );
          }

          if (day.toLocaleDateString() === activeDate.toLocaleDateString()) {
            return (
              <div
                key={day.toLocaleDateString()}
                onClick={(e) => onSelect(e)}
                className="bg-red-500"
              >
                {day.getDate()}
              </div>
            );
          }
          return (
            <div
              data-date={day}
              key={day.toLocaleDateString()}
              onClick={(e) => onSelect(e)}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
