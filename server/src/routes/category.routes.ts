import { Router } from "express";
import { categoryController } from "../controllers/category.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/", categoryController.getAll);

router.get("/:id", categoryController.get);

router.post("/", categoryController.create);

router.put("/:id", categoryController.update);

router.delete("/:id", categoryController.remove);

export default router;
