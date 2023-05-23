import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function postShorten(req, res) {
    const { url } = req.body;
    try {
        const shortUrl = nanoid();
        const userId = res.locals.userId;
        await db.query(`INSERT INTO urls ("url", "shortUrl", "userId") VALUES ($1, $2, $3);`, [url, shortUrl, userId]);
        const idUrl = await db.query(`SELECT * FROM urls;`)
        const result = {
            id: idUrl.id,
            shortUrl: shortUrl
        }
        res.status(201).send(result);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrlbyId(req, res) {
    const { id } = req.params;
    try {
        const urlId = await db.query(`SELECT * FROM urls WHERE id=$1;`, [id]);
        res.status(200).send(urlId.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getShortUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const shortOpen = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [shortUrl])
        if(shortOpen.rows.length === 0){
            return res.sendStatus(404);
        }

        const {url, visitCount} = shortOpen.rows[0];

        await db.query(`UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2;`,[visitCount + 1, shortUrl]);
        return res.redirect(url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deletebyId(req, res) {
    const {id} = req.params;
    try {
        const urlResult = await db.query(`SELECT * FROM url WHERE id=$1;`,[id]);
        if(urlResult.rows.length === 0){
            return res.sendStatus(404);
        }
        const url=urlResult.rows[0];

        const userResult = await db.query(`SELECT * FROM registered WHERE id=$1;`, [url.userId]);
        if(userResult.rows.length === 0){
            return res.sendStatus(404);
        }

        const user = userResult.rows[0];

        if(user.id !== url.userId){
            return res.status(401).send('Unauthorized');
        }

        await db.query(`DELETE FROM url WHERE id=$1;`,[id]);
        return res.sendStatus(204);
        

    } catch (err) {
        res.status(500).send(err.message);
    }
}