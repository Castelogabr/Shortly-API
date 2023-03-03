import bcrypt from "bcrypt";
import { db } from "../database/db.js"

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    try {
        await db.query(`INSERT INTO users 
        (name, email, password) 
        VALUES ($1, $2, $3);`, [name, email, hashPassword]);

        res.sendStatus(201);
    } catch (err) {
        res.status(422).send(err.message);
    }
}
