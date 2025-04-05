import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service"

class AuthController {
  async checkStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const status = await authService.checkStatus()
      res.json(status);
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();

export const { checkStatus } = authController;