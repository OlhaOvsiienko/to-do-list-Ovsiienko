import React from 'react';
import styles from './TaskItem-style.module.css'

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
    <div key={id} className={styles.taskField}>
      <div className={styles.leftContent}>
      <label style={{ textDecoration: completed ? "line-through" : "none" }} >
        <input type="checkbox" checked={completed} onChange={handleToggle} />
        {text}
      </label>
      </div>
      <div>
      <button onClick={handleRemove} className={styles.buttonRemove}>Remove</button>
      </div>
    </div>
  );
};

export default TaskItem;


