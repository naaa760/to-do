"use client";

import {
  getWeekDays,
  formatDayName,
  formatShortDay,
  formatDayNumber,
  isSameDay,
} from "@/lib/utils/date";

interface CalendarHeaderProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function CalendarHeader({
  selectedDate,
  onDateSelect,
}: CalendarHeaderProps) {
  const weekDays = getWeekDays(selectedDate);

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">{formatDayName(selectedDate)}</h2>
      <div className="flex space-x-4">
        {weekDays.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          return (
            <button
              key={date.toString()}
              onClick={() => onDateSelect(date)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isSelected ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
            >
              <span className="text-sm">{formatShortDay(date)}</span>
              <span className="text-lg font-semibold">
                {formatDayNumber(date)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
