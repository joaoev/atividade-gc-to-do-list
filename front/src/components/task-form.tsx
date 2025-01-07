import React, { useState } from 'react';
import api from '../api';

type Props = {
  onTaskAdded: () => void;
};

export const TaskForm: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      await api.post('/tasks', { title });
      setTitle('');
      onTaskAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

