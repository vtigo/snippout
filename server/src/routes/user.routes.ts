import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const controller = new UserController();

const router = Router();

// router.get("/", controller.getAll);
// router.get("/:id", controller.getOne);
// router.post("/", controller.create);
// router.patch("/:id", controller.update);
// router.delete("/:id", controller.delete);

export default router;