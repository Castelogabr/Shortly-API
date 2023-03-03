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

export async function getUser(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    try {
        const sessionExists = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])

        if (sessionExists.rowCount === 0) return res.status(401).send('Sessão expirada')

        const userFind = await db.query(`SELECT * FROM users WHERE id = $1`, [sessionExists.rows[0].userId])

        const findUrls = await db.query(
            `SELECT id, "shortUrl", url, "visitCount" AS "visitCount"
                 FROM urls
                 WHERE "userId" = $1`
            , [userFind.rows[0].id])

        res.send(
            {
                id: userFind.rows[0].id,
                name: userFind.rows[0].name,
                visitCount: userFind.rows[0].views_count,
                shortenedUrls: findUrls.rows
            }
        )
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}