import { Router } from "express";
import { shortenUrl } from "../controllers/urlControllers.js";
import { authorizationValidation } from "../middlewares/authMiddlewares.js";

const urlRoutes = Router();

urlRoutes.post("/urls/shorten", authorizationValidation, shortenUrl);

export default urlRoutes;