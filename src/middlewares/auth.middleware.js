import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const user = await db.query(`SELECT * FROM login WHERE token=$1;`, [token])
        if (user.rows.length === 0) {
            return res.sendStatus(401);
        }

        const userId = user.rows[0].userId;
        res.locals.userId = userId;
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}