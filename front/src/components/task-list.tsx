import React, { useEffect, useState } from 'react';
import api from '../api';

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const response = await api.get('/tasks');
    setTasks(response.data as Task[]);
  };

  const toggleTask = async (id: string, completed: boolean) => {
    await api.put(`/tasks/${id}`, { completed });
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id, !task.completed)}
            />
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
