import { NextFunction, Request, Response } from "express";
import * as categoryService from "../services/category.service";
import { idParamSchema } from "../validation/schemas/mongo.schema";
import { ValidateBody, ValidateParams } from "../validation/validate.decorator";
import { createCategorySchema, updateCategorySchema } from "../validation/schemas/category.schema";

class CategoryController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categorys = await categoryService.getAll();
      res.json(categorys);
    } catch (error) {
      next(error);
    }
  }

  @ValidateParams(idParamSchema)
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.get(req.params.id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  @ValidateBody(createCategorySchema)
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCategory = await categoryService.create(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }

  @ValidateParams(idParamSchema)
  @ValidateBody(updateCategorySchema)
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCategory = await categoryService.update(req.params.id, {
        ...req.body,
        updated_at: new Date(),
      });

      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  @ValidateParams(idParamSchema)
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.remove(req.params.id);
      res.json(true);
    } catch (error) {
      next(error);
    }
  }
}

export const categoryController = new CategoryController();

export const { getAll, get, create, update, remove } = categoryController;