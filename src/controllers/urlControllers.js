import { db } from "../database/db.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { userId } = req.body
  const { url } = req.body;
  const shortUrl = nanoid(10);

  try {
    await db.query(
      `INSERT INTO urls ("url", "userId", "shortUrl") VALUES ($1, $2, $3)`,
      [url,userId, shortUrl]
    );

    const short = await db.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1`,
      [shortUrl]
    );

    res.status(201).send({ id: short.rows[0].id, shortUrl });
  } catch (err) {
    res.sendStatus(500);
  }
}