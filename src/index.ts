import debug from 'debug';
import { env } from './config/env.ts';
import { connectDB } from './config/db-config.ts';
import { createServer } from 'node:http';
import { createApp } from './app.ts';

// Creo server
const log = debug(`${env.PROJECT_NAME}:index`);
log('Starting API server...');

// Conecto
// await connectDB()
const pool = await connectDB();

const port = env.PORT || 3000;
const app = createApp(pool);

//
const server = createServer(app);
log('Server created');
