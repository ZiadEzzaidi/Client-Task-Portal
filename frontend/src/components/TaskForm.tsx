import React, { useState } from "react";
import { Task } from "./TaskBoard";
import "./TaskForm.css";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id">) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");
  const [client, setClient] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status, client });
    setTitle("");
    setDescription("");
    setStatus("todo");
    setClient("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "todo" | "in-progress" | "done")
        }
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input
        type="text"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Client name"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
