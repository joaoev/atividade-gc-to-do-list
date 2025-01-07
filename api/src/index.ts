import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './database';
import { router } from './routes';

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api',router);

const PORT = 3333;
app.listen(PORT, () => console.log(`[API] Aplicação executando: http://localhost:${PORT}`));
