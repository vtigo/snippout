import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { AnyZodObject } from 'zod';

export function ValidateBody(schema: AnyZodObject) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
      try {
        const validationResult = schema.safeParse(req.body);

        if (!validationResult.success) {
          return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: validationResult.error.errors.map(err => ({
              path: err.path.join('.'),
              message: err.message
            }))
          });
        }

        req.body = validationResult.data;
        return originalMethod.call(this, req, res, next);
      } catch (error) {
        next(error);
      }
    };

    return descriptor;
  };
}

export function ValidateParams(schema: AnyZodObject) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
      try {
        const validationResult = schema.safeParse(req.params);

        if (!validationResult.success) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid parameters',
            errors: validationResult.error.errors.map(err => ({
              path: err.path.join('.'),
              message: err.message
            }))
          });
        }

        req.params = validationResult.data;
        return originalMethod.call(this, req, res, next);
      } catch (error) {
        next(error);
      }
    };

    return descriptor;
  };
}

export function ValidateQuery(schema: AnyZodObject) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
      try {
        const validationResult = schema.safeParse(req.query);

        if (!validationResult.success) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid query parameters',
            errors: validationResult.error.errors.map(err => ({
              path: err.path.join('.'),
              message: err.message
            }))
          });
        }

        req.query = validationResult.data;
        return originalMethod.call(this, req, res, next);
      } catch (error) {
        next(error);
      }
    };

    return descriptor;
  };
}