import { Router } from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import categoryRouter from "./category.routes";
const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/category", categoryRouter);

export default router;