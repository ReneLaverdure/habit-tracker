import { useContext, createContext, useState } from "react";
import type { CalendarContext } from "~/types/calendar";
import type { MouseEvent, PropsWithChildren } from "react";

const CalendarContext = createContext<CalendarContext | undefined>(undefined);

export function CalendarProvider({ children }: PropsWithChildren) {
  const currentDate = new Date();
  const [activeDate, setActiveDate] = useState<Date>(currentDate);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const year = currentDate.getFullYear();
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
  const handleActiveDate = (event: MouseEvent<HTMLElement>) => {
    const newDate = event.currentTarget.dataset.date;
    if (!newDate) return;
    setActiveDate(() => new Date(newDate));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        return 0;
      }
      return prev + 1;
    });
  };
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
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

  let days = getDaysInMonth(currentMonth, year);
  let missingFront = days[0].getDay();
  let holdingDate = new Date(days[0]);

  while (missingFront) {
    holdingDate.setDate(holdingDate.getDate() - 1);

    days.unshift(new Date(holdingDate));
    missingFront--;
  }

  return (
    <CalendarContext
      value={{
        currentDate,
        currentMonth,
        activeDate,
        setActiveDate,
        handleActiveDate,
        handleNextMonth,
        handlePrevMonth,
        days,
        months,
      }}
    >
      {children}
    </CalendarContext>
  );
}

export default function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useClaendar must be used within a CalendarProvider");
  }
  return context;
}
