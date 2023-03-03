import { db } from "../database/db.js";
import { nanoid } from "nanoid";


export async function shortenUrl(req, res) {
  const  { userId } = req.body
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

export async function getURL(req, res) {
  const {id} = req.params;

  try {
    const exists = await db.query(
      `SELECT id, "shortUrl", url FROM urls WHERE id = $1`,
      [id]
    );

    const infoUrl = exists.rows[0];

    if (!infoUrl) {
      return res.status(404).send("URL inexistente");
    }

    res.status(200).send(infoUrl);
    
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getRedirect(req, res){

  const {shortUrl} = req.params;

  try{
      const {rows: url} = await db.query('UPDATE urls SET "visitCount" = "visitCount" +1 WHERE "shortUrl"=$1 RETURNING url;', [shortUrl]);

      if(!url[0]) return res.sendStatus(404);
      return res.redirect(url[0]);

  }catch(err){
      return res.status(500).send(err.message);
  }
}
