import { db } from "../database/db.js"
import {singUpSchema, signInSchema } from "../schemas/userSchema.js"
import bcrypt from "bcrypt";

export async function signUpSchemaValidation(req, res, next) {
    const { email } = req.body;

    try {
      const { err } = singUpSchema.validate(req.body, { abortEarly: false })
  
    if (err) {
      const errs = err.details.map((detail) => detail.message);
      return res.status(422).send({ errs });
    }

    const Exists = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    if (Exists.rowCount > 0) return res.status(409).send("Cliente já cadastrado no sistema!")


   } catch (err) {
      return res.status(422).send(err.message);
    }
    next();
  }


export async function signInSchemaValidation(req, res, next) {
  const {email, password} = req.body;

  try {
    const { err } = signInSchema.validate(req.body, { abortEarly: false });

    if (err) {
      const errs = err.details.map((detail) => detail.message);
      return res.status(422).send({ errs });
    }

    const userExists = await db.query(
      "SELECT * FROM users WHERE email=$1",[email]);

    if (userExists.rowCount === 0) {
      return res.sendStatus(401);
    }

    const passwordOk = bcrypt.compareSync(
      password,
      userExists.rows[0].password
    );
    if (!passwordOk) return res.sendStatus(401);

    next();
  } catch (err) {
    return res.status(422).send(err.message);
  }
}
