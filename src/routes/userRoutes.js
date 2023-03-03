import express from "express";
import { signUp } from "../controllers/usercontrollers.js";
import { validateUser }  from "../middlewares/usermiddlewares.js";

const userRoute = express.Router();

userRoute.post('/signup', validateUser, signUp); 



export default userRoute;