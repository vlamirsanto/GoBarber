import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Tratativa GLOBAL de errors
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

app.listen(3333, () => console.log('Server started on post 3333!'));
