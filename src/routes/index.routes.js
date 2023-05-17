import { Router } from "express";
import authRouter from "./auth.routes.js";
import urlsRouter from "./urls.routes.js";
import userRouter from "./users.routes.js";
import rankRouter from "./ranking.routes.js";

const router = Router();
router.use(authRouter);
router.use(urlsRouter);
router.use(userRouter);
router.use(rankRouter);

export default router;