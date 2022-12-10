import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
// import ValidateError from './validationError';
import { ErrorTypes, errorCatalog } from './errosCatalog';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req:Request, res: Response, next: NextFunction ) => {
  if (err instanceof ZodError) { 
    return res.status(400).json({ message: err.issues });
  }
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }
  console.error(err);
  return res.status(500).json({ message: 'internal error' });
};

export default errorHandler;