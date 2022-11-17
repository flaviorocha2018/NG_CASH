import { Request, Response, NextFunction } from 'express';
import ValidateError from './validationError';

const errorMiddleware = (
  err: ValidateError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (!err.status) {
    return res.status(500).json({ message: 'Server Error' });
  }

  const { message, status } = err;
  res.status(status).json({ message });
};

export default errorMiddleware;
