import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/userRoutes.js";
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());


const PORT = process.env.PORT
server.listen(PORT, ()=> console.log(`servidor rodando na porta: ${PORT}`))

server.use(userRoute);
