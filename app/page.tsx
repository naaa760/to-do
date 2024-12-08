"use client";
import { useState, useMemo } from "react";
import { format, addDays, startOfWeek, endOfWeek, isSameDay } from "date-fns";
import { CalendarHeader } from "@/components/calendar-header";
import { TodoItem } from "@/components/todo-item";
import { AddTodo } from "@/components/add-todo";
import { useTodoStore } from "@/lib/store/todo-store";
import { formatDate } from "@/lib/utils/date";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoStore();

  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, i) => format(addDays(start, i), "E"));
  }, [selectedDate]);

  const calendarDates = useMemo(() => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
    const dates: Date[] = [];
    let currentDate = start;
    while (currentDate <= end) {
      dates.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }
    return dates;
  }, [selectedDate]);

  const todaysTodos = useMemo(
    () => todos.filter((todo) => todo.date === formatDate(selectedDate)),
    [todos, selectedDate]
  );

  const handleAddTodo = (text: string) => {
    addTodo(text, formatDate(selectedDate));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <CalendarHeader
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <div className="grid grid-cols-7 gap-4 text-center text-gray-500 font-medium mb-4">
            {weekDays.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-4">
            {calendarDates.map((date, index) => (
              <div
                key={index}
                className={`rounded-full w-8 h-8 flex justify-center items-center cursor-pointer transition-colors ${
                  isSameDay(date, selectedDate)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {format(date, "d")}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {format(selectedDate, "EEEE, MMMM d")}
            </h3>
            <AddTodo onAdd={handleAddTodo} />
          </div>
          <div className="space-y-1">
            {todaysTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
            {todaysTodos.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No tasks for today. Add one above!
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
