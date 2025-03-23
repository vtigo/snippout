import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.getAll());
  } catch (error: any) {
    console.error(`erroror while getting the users`, error.message);
    next(error);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.get(req.params.id));
  } catch (error: any) {
    console.error(`erroror while getting the user`, error.message);
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.create(req.body));
  } catch (error: any) {
    console.error(`erroror while creating the user`, error.message);
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.update(req.params.id, req.body));
  } catch (error: any) {
    console.error(`erroror while updating the user`, error.message);
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await userService.remove(req.params.id));
  } catch (error: any) {
    console.error(`erroror while deleting the user`, error.message);
    next(error);
  }
}

export { getAll, get, create, update, remove };