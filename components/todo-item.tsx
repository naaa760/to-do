"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/lib/store/todo-store";
import { Pencil, Trash2, X, Check } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-4 py-3 group">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5"
      />
      {isEditing ? (
        <div className="flex-1 flex items-center space-x-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border rounded-md"
            autoFocus
          />
          <button
            onClick={handleEdit}
            className="text-green-600 hover:text-green-700"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-red-600 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-600 hover:text-gray-800"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
