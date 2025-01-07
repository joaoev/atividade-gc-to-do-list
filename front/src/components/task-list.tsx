import React, { useEffect, useState } from 'react';
import api from '../api';

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const response = await api.get('/tasks', {
      headers: {
      'Accept': 'application/json'
      }
    });
    console.log("RESPONSE: ", response.data);
    setTasks(Array.isArray(response.data) ? response.data as Task[] : []);
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
            <button onClick={() => deleteTask(task._id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
};

