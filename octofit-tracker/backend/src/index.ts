import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import db from './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  res.json({
    ok: true,
    service: 'octofit-backend',
    port,
    baseUrl,
    mongoState: db.readyState,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});