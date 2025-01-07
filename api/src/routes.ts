import { Router } from 'express';
import Task from './models/Task';

export const router = Router();


router.get('/tasks', async (_, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch {
        res.status(500).json({ error: 'Erro ao carregar as tarefas!' });
    }
});

router.post('/tasks', async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        await task.save();
        res.json(task);
    } catch {
        res.status(500).json({ error: 'Erro ao cadastrar tarefa!' });
    }
});

router.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        await Task.findByIdAndUpdate(id, { completed });
        res.sendStatus(200);
    } catch {
        res.status(500).json({ error: 'Erro ao carregar tarefa!' });
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch {
        res.status(500).json({ error: 'Erro ao deletar tarefa!' });
    }
});
