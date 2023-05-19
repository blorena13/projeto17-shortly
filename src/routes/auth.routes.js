import { Router } from "express";
import { signin, signup } from "../controllers/auth.controllers.js";
import { signUpSchema, signInSchema } from "../schemas/auth.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signup);
authRouter.post("/signin", validateSchema(signInSchema), signin);

export default authRouter;