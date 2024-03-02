import React, { Component, ChangeEvent } from "react";
import TaskItem from "./TaskItem";
import styles from './TaskList-style.module.css'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks?: Task[]; // Свойство tasks теперь необязательное
}

interface TaskListState {
  list: Task[];
  text: string;
}

export default class TaskList extends Component<TaskListProps, TaskListState> {
  constructor(props: TaskListProps) {
    super(props);

    const storedTasks = localStorage.getItem("tasks");
    const initialList =
      props.tasks ?? (storedTasks && JSON.parse(storedTasks)) ?? [];

    this.state = {
      list: initialList,
      text: "",
    };
    localStorage.setItem("tasks", JSON.stringify(this.state.list));
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value });
  };

  handleAddClick = () => {
    const task: Task = {
      id: Date.now(),
      text: this.state.text,
      completed: false,
    };

    this.setState(
      (prevState) => ({
        list: [...prevState.list, task],
        text: "",
      }),
      () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.list));
      }
    );
  };

  handleRemove = (id: number) => {
    const updatedList = this.state.list.filter((task) => task.id !== id);

    this.setState({ list: updatedList }, () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.list));
    });
  };

  handleToggle = (id: number) => {
    const updatedList = this.state.list.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    this.setState({ list: updatedList }, () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.list));
    });
  };

  render() {
    const { list, text } = this.state;

    return (
      <div className={styles.field}>
        <div className={styles.title}>Task List</div>

        <div>
          <label>
            <input
              type="text"
              placeholder="Enter task"
              value={text}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleAddClick} className={styles.buttonAdd}>Add</button>
          </label>
        </div>

        {list.length === 0 ? (
          <div>No tasks to display</div>
        ) : (
          list.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onRemove={this.handleRemove}
              onToggle={this.handleToggle}
            />
          ))
        )}
      </div>
    );
  }
}
