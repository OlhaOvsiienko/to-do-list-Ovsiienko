import React from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  task: Task | null;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, onRemove, onToggle }) => {
  if (!task) return null; 
  const { id, text, completed } = task;
  
  const handleRemove = () => {
    onRemove(id);
  };

  const handleToggle = () => {
    onToggle(id);
  };

  return (
    <div key={id}>
      <label style={{ textDecoration: completed ? "line-through" : "none" }}>
        <input type="checkbox" checked={completed} onChange={handleToggle} />
        {text}
      </label>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default TaskItem;


