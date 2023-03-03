import express from "express";
import { signUp, signIn} from "../controllers/userControllers.js";
import { signUpSchemaValidation, signInSchemaValidation }  from "../middlewares/userMiddlewares.js";

const userRoutes = express.Router();

userRoutes.post('/signup', signUpSchemaValidation, signUp); 
userRoutes.post('/signin', signInSchemaValidation, signIn);
 


export default userRoutes;