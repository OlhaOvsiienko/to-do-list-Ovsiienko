import React, { Component } from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: number;
    task: string;
    completed: boolean;
  }
  
  interface TaskListProps {
    tasks: Task[];
  }

  export default class TaskList extends Component<TaskListProps> {
  constructor(props: {}) {
    super(props);

    const storedTasks = localStorage.getItem('tasks');
    const initialState: string | null = storedTasks ? JSON.parse(storedTasks) : null;

    

    this.state = {
        list: initialState,
        newTask: ""
      };
  }

  handleInputChange = (event: { target: { value: string; }; }) => {
    this.setState({ newTask: event.target.value });
  }

  handleAddClick = () => {
    const newTask: { id: number; task: string; completed: boolean } = {
        id: Date.now(), 
        task: this.state.newTask,
        completed: false
      };

    this.setState(prevState => ({
      list: [...prevState.list, newTask],
      newTask: "" 
    }), () => {
      localStorage.setItem('tasks', JSON.stringify(this.state.list));
    });
  } 

  handleRemove = (id: number) => {
    const updatedList = this.state.list.filter((task: { id: number; }) => task.id !== id);

    this.setState({ list: updatedList }, () => {
      localStorage.setItem('tasks', JSON.stringify(this.state.list));
    });
  }

  handleToggle = (id: number) => {
    const updatedList = this.state.list.map((task: { id: number; task: string; completed: boolean }) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  
    this.setState({ list: updatedList }, () => {
      localStorage.setItem('tasks', JSON.stringify(this.state.list));
    });
  }
  

  render() {
    const { list, newTask } = this.state;

    return (
      <div>
        <div>Task List</div>

        <div>
          <label>
            <input 
              type="text" 
              placeholder="Enter task" 
              value={newTask} 
              onChange={this.handleInputChange} 
            />
            <button onClick={this.handleAddClick}>Add</button>
          </label>
        </div>

        {list.length === 0 ? (
          <div>No tasks to display</div>
        ) : (
          list.map(task => (
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

