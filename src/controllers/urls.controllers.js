import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function postShorten(req, res) {
    const { url } = req.body;
    try {
        const shortUrl = nanoid();
        await db.query(`INSERT INTO urls (url, shortUrl) VALUES ($1, $2);`, [url, shortUrl]);
        res.status(201).send(shortUrl);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrlbyId(req, res) {
    const {id} = req.params;
    try {
        const urlId = await db.query(`SELECT * FROM urls WHERE id=$1;`,[id]);
        res.status(200).send(urlId.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getShortUrl(req, res) {
    try {

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deletebyId(req, res) {
    try {

    } catch (err) {
        res.status(500).send(err.message);
    }
}