import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.getAll());
  } catch (error: any) {
    console.error(`error while getting the users`, error.message);
    next(error);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.get(req.params.id));
  } catch (error: any) {
    console.error(`error while getting the user`, error.message);
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.create(req.body));
  } catch (error: any) {
    console.error(`error while creating the user`, error.message);
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
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

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.remove(req.params.id));
  } catch (error: any) {
    console.error(`error while deleting the user`, error.message);
    next(error);
  }
}

export { getAll, get, create, update, remove };