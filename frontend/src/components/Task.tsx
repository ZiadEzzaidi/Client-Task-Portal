import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import "./Task.css";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  client: string;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  status,
  client,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "TASK",
      item: { id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  drag(ref);

  return (
    <div
      ref={ref}
      className={`task ${status}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="task-meta">
        <span>Status: {status}</span>
        <span>Client: {client}</span>
      </div>
    </div>
  );
};

export default Task;
