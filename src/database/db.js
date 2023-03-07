import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const configDataBase =  {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
};


export const db = new Pool(configDataBase);
