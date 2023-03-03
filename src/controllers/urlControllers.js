import { db } from "../database/db.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { url } = req.body;
  const session = res.locals.session;

  try {
      const shortUrl = nanoid(6);

      await db.query('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)', [url, shortUrl, session.userId]);

      const id = await db.query("SELECT id FROM urls WHERE url = $1", [url]);

      return res.status(201).send({id: id.rows[0].id, shortUrl});
  } catch (error) {
      return res.status(500).send(error.message);
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

