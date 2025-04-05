import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AuthError } from '../utils/errors';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
      };
    }
  }
}

/**
 * Authentication middleware to protect routes
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    // Get the token from cookies
    const token = req.cookies.token;

    if (!token) {
      throw new AuthError('Authentication required');
    }

    // Verify the token
    const decoded = verifyToken(token);

    if (!decoded) {
      throw new AuthError('Invalid or expired token');
    }

    // Add user to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(401).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    next(error);
  }
}

/**
 * Optional authentication middleware that doesn't throw an error if no token exists
 */
export function optionalAuthenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    // Get the token from cookies
    const token = req.cookies.token;

    if (token) {
      // Verify the token
      const decoded = verifyToken(token);

      if (decoded) {
        // Add user to request
        req.user = decoded;
      }
    }

    next();
  } catch (error) {
    // Just continue if there's an error
    next();
  }
}