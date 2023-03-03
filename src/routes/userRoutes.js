import express from "express";
import { signUp, signIn, getUser} from "../controllers/userControllers.js";
import { authorizationValidation } from "../middlewares/authMiddlewares.js";
import { signUpSchemaValidation, signInSchemaValidation }  from "../middlewares/userMiddlewares.js";

const userRoutes = express.Router();

userRoutes.post('/signup', signUpSchemaValidation, signUp); 
userRoutes.post('/signin', signInSchemaValidation, signIn);
userRoutes.get("/users/me", authorizationValidation, getUser);



export default userRoutes;