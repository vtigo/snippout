import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import { generateToken } from "../utils/jwt";
import { ValidateBody } from "../validation/validate.decorator";
import { loginSchema, registerSchema } from "../validation/schemas/auth.schema";

const cookieOptions = {
  httpOnly: true, // Cannot be accessed by client-side JavaScript
  secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
  sameSite: 'strict' as const, // Strict same-site policy
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

class AuthController {
  /**
   * Register a new user
   */
  @ValidateBody(registerSchema)
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.registerUser(req.body);

      const token = generateToken(user);

      res.cookie('token', token, cookieOptions);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login a user
   */
  @ValidateBody(loginSchema)
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.loginUser(req.body);

      // Generate token
      const token = generateToken(user);

      res.cookie('token', token, cookieOptions);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Logout a user
   */
  async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie('token');
    res.json('Logged out successfully');
  }

  /**
   * Check authentication status
   */
  async checkStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          status: 'error',
          message: 'Not authenticated'
        });
        return;
      }

      const user = await authService.checkStatus(req.user.id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();

export const { register, login, logout, checkStatus } = authController;