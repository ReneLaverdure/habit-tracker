import type { Dispatch, MouseEvent, SetStateAction } from "react";
export interface Calendar {
  activeDate: Date;
}

export interface CalendarContext {
  currentDate: Date;
  currentMonth: number;
  activeDate: Date;
  setActiveDate: Dispatch<SetStateAction<Date>>;
  handleActiveDate: (e: MouseEvent<HTMLElement>) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  days: Date[];
  months: String[];
}
