import { Router } from "express";
import { postShorten, getUrlbyId, getShortUrl, deletebyId } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { urlSchema } from "../schemas/urls.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten",authValidation, validateSchema(urlSchema), postShorten);
urlsRouter.get("/urls/:id", getUrlbyId);
urlsRouter.get("/urls/open/:shortUrl", getShortUrl);
urlsRouter.delete("/urls/:id", authValidation, deletebyId);

export default urlsRouter;