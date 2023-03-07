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

export async function getUser(req, res){
try {
    const { authorization } = req.headers

    const authToken = authorization?.replace("Bearer ", '')

    const userId = await db.query(`SELECT "userId" FROM sessions WHERE token = $1;`, [authToken]);

    const result = await db.query(
        `SELECT us.id, us.name,
                SUM(ur."visitCount") as "visitCount",
                json_agg(JSON_BUILD_OBJECT('id', ur.id, 'shortUrl', ur."shortUrl", 'url', ur.url, 'visitCount', ur."visitCount")) AS "shortenedUrls"
                FROM users us
                JOIN urls ur ON ur."userId" = us.id
                WHERE us.id = $1
                GROUP BY us.id;`, [userId.rows[0].userId]);

    res.status(200).send(result.rows[0]);

} catch (err) {
    res.status(500).send(err.message);
}
}

export async function getRanking(req, res) {
    try {
      const result = await db.query(
        `SELECT users.id, users.name, 
        COUNT("userId") AS "linksCount", 
        COALESCE(SUM("visitCount"), 0) AS "visitCount" 
        FROM users LEFT JOIN urls ON users.id = urls."userId" 
        GROUP BY users.id 
        ORDER BY "visitCount" DESC LIMIT 10;`
      );
      return res.status(200).send(result.rows.slice(0, 10));
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }