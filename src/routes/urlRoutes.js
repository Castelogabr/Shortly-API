import { Router } from "express";
import { shortenUrl } from "../controllers/urlControllers.js";
import { authorizationValidation } from "../middlewares/authMiddlewares.js";
import { urlSchemaValidation } from "../middlewares/urlMiddlewares.js";
const urlRoutes = Router();

urlRoutes.post("/urls/shorten", authorizationValidation, urlSchemaValidation,shortenUrl);

export default urlRoutes;