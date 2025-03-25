import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { ValidateBody, ValidateParams } from "../validation/validate.decorator";
import { createUserSchema, updateUserSchema } from "../validation/schemas/user.schema";
import { idParamSchema } from "../validation/schemas/mongo.schema";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userService.getAll());
    } catch (error: any) {
      console.error(`error while getting the users`, error.message);
      next(error);
    }
  }

  @ValidateParams(idParamSchema)
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userService.get(req.params.id));
    } catch (error: any) {
      console.error(`error while getting the user`, error.message);
      next(error);
    }
  }

  @ValidateBody(createUserSchema)
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userService.create(req.body));
    } catch (error: any) {
      console.error(`error while creating the user`, error.message);
      next(error);
    }
  }

  @ValidateParams(idParamSchema)
  @ValidateBody(updateUserSchema)
  async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const data = {
      ...req.body,
      updated_at: new Date(),
    }
    try {
      res.json(await userService.update(id, data));
    } catch (error: any) {
      console.error(`error while updating the user`, error.message);
      next(error);
    }
  }

  @ValidateParams(idParamSchema)
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userService.remove(req.params.id));
    } catch (error: any) {
      console.error(`error while deleting the user`, error.message);
      next(error);
    }
  }
}

const userController = new UserController();

export const { getAll, get, create, update, remove } = userController;