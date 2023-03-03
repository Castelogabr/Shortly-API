import { db } from "../database/db.js"
import {singUpSchema } from "../schemas/userSchema.js"

export async function validateUser(req, res, next) {
    const { email } = req.body;

    const Exists = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    if (Exists.rowCount > 0) return res.status(409).send("Cliente já cadastrado no sistema!")

    const { err } = singUpSchema.validate(req.body, { abortEarly: false })

    if (err) return res.status(409).send(err.message)

    next();
  }

