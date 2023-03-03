import { Router } from "express";
import { shortenUrl, getURL, getRedirect } from "../controllers/urlControllers.js";
import { authorizationValidation } from "../middlewares/authMiddlewares.js";
import { urlSchemaValidation } from "../middlewares/urlMiddlewares.js";
const urlRoutes = Router();

urlRoutes.post("/urls/shorten", authorizationValidation, urlSchemaValidation,shortenUrl);
urlRoutes.get("/urls/:id", getURL);
urlRoutes.get('/urls/open/:shortUrl', getRedirect);


export default urlRoutes;