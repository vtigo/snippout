import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            status: 'error',
            errors: error.errors.map(err => ({
              path: err.path.join('.'),
              message: err.message
            }))
          });
        }
        next(error);
      }
    };

export const validateBody =
  (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            status: 'error',
            errors: error.errors.map(err => ({
              path: err.path.join('.'),
              message: err.message
            }))
          });
        }
        next(error);
      }
    };

export const validateParams =
  (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.params);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            status: 'error',
            errors: error.errors.map(err => ({
              path: err.path.join('.'),
              message: err.message
            }))
          });
        }
        next(error);
      }
    };