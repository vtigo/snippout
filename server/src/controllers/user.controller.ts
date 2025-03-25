import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import { idParamSchema } from "../validation/schemas/mongo.schema";
import { createUserSchema, updateUserSchema } from "../validation/schemas/user.schema";
import { ValidateBody, ValidateParams } from "../validation/validate.decorator";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.json({
        status: "success",
        data: users
      });
    } catch (error) {
      next(error);
    }
  }

  @ValidateParams(idParamSchema)
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.get(req.params.id);
      res.json({
        status: "success",
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  @ValidateBody(createUserSchema)
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await userService.create(req.body);
      res.status(201).json({
        status: "success",
        data: newUser
      });
    } catch (error) {
      next(error);
    }
  }

  @ValidateParams(idParamSchema)
  @ValidateBody(updateUserSchema)
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await userService.update(req.params.id, {
        ...req.body,
        updated_at: new Date(),
      });

      res.json({
        status: "success",
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }

  @ValidateParams(idParamSchema)
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.remove(req.params.id);
      res.json({
        status: "success",
        message: "User successfully deleted"
      });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();

export const { getAll, get, create, update, remove } = userController;