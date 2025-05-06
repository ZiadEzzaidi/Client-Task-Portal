import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import TaskForm from "./TaskForm";
import "./TaskBoard.css";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  client: string;
}

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design Homepage",
      description: "Create wireframes for client review",
      status: "todo",
      client: "Acme Corp",
    },
    {
      id: "2",
      title: "API Integration",
      description: "Connect frontend to backend services",
      status: "in-progress",
      client: "XYZ Inc",
    },
    {
      id: "3",
      title: "Bug Fixes",
      description: "Resolve reported UI issues",
      status: "done",
      client: "ABC Ltd",
    },
  ]);

  const statuses: Array<"todo" | "in-progress" | "done"> = [
    "todo",
    "in-progress",
    "done",
  ];

  const addTask = (newTask: Omit<Task, "id">) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: Date.now().toString(),
      },
    ]);
  };

  const moveTask = (id: string, newStatus: "todo" | "in-progress" | "done") => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const DroppableColumn: React.FC<{
    status: "todo" | "in-progress" | "done";
  }> = ({ status }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "TASK",
      drop: (item: { id: string }) => moveTask(item.id, status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    drop(ref);

    return (
      <div ref={ref} className={`task-column ${isOver ? "column-over" : ""}`}>
        <h3>{status.replace("-", " ").toUpperCase()}</h3>
        <div className="tasks-list">
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <Task key={task.id} {...task} />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="task-board">
      <TaskForm onSubmit={addTask} />
      {statuses.map((status) => (
        <DroppableColumn key={status} status={status} />
      ))}
    </div>
  );
};

export default TaskBoard;
