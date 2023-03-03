import bcrypt from "bcrypt";
import { db } from "../database/db.js"
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    try {
        await db.query(`INSERT INTO users 
        (name, email, password) 
        VALUES ($1, $2, $3);`, [name, email, hashPassword]);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
export async function signIn(req, res) {
    const { email } = req.body;
    const token = uuid();

    try {
        ("SELECT * FROM users WHERE email=$1");
        const userId = await db.query(
            "SELECT id FROM users WHERE email=$1",
            [email]
        );

        await db.query(
            'INSERT INTO sessions ("userId", token) VALUES ($1, $2)',
            [userId.rows[0].id, token]
        );

        return res.status(200).send({ token });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

