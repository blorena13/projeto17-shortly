import { Router } from "express";
import { postShorten, getUrlbyId, getShortUrl, deletebyId } from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", postShorten);
urlsRouter.get("/urls/:id", getUrlbyId);
urlsRouter.get("/urls/open/:shortUrl", getShortUrl);
urlsRouter.delete("/urls/:id", deletebyId);

export default urlsRouter;