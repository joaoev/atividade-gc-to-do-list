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
      try {
        await api.post('/tasks', { title });
      } catch (error) {
        console.error('Falha ao adicionar tarefa: ', error);
        alert('Falha ao adicionar tarefa.');
      }
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
        placeholder="Digite o que você precisa fazer..."
      />
      <button type="submit">+</button>
    </form>
  );
};

