import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());


const PORT = process.env.PORT
server.listen(PORT, ()=> console.log(`servidor rodando na porta: ${PORT}`))

server.use(userRoutes);
server.use(urlRoutes);
