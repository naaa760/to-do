"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
}