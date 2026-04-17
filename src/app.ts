import express from 'express';
// importar anónimamente , sin corchetes.
// importar con corchetes es algo propio de lo que estoy importando.
import { env } from './config/env.ts';
import debug from 'debug';
import type { Pool } from 'pg';
import morgan from 'morgan';
import {cors} from "cors"

export const createApp = (pool: Pool) => {
    const log = debug(`${env.PROJECT_NAME}:app`);
    log('Starting Express app...');
    const app = express();
    app.disable('x-powered-by');
    log('Express app created');

    // Middleware Utilities
    app.use(morgan('dev'));
    app.use(
        cors({
            origin: '*',
        }),
    );
    app.use(express.json());
    app.use(express.urlencoded());
    log(pool.ending);

    app.use('/api/animals', animalRouter(pool));

    app.use(_req, res) => {
        res.status(404);
        res.statusMessage = 'Not Found';
        return res.json({
            message:'Resource not found'
        })
    }

    return app;
};


