import { db } from "../database/db.js";

export async function authorizationValidation(req, res, next) {
  const { authorization } = req.headers;
  const authToken = authorization?.replace("Bearer ", "");

  if (!authToken) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.query(
      `SELECT * FROM sessions WHERE token = $1`,
      [authToken]
    );

    if (session.rowCount === 0) {
      return res.sendStatus(401);
    }
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}