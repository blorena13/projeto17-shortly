import { db } from "../database/database.connection.js";

export async function getRanking(req,res) {
    try{

        const result = await db.query(`
        SELECT registered.id, registered.name, COUNT(urls.id) AS linksCount, COALESCE(SUM(urls.visitCOunt), 0) AS visitCount
        FROM registered
        LEFT JOIN urls ON urls.userId = registered.id
        GROUP BY registered.id, registered.name
        ORDER BY visitCount DESC
        LIMIT 10
        ;`);

        const ranking = result.rows.map(row => {
            return {
                id: row.id,
                name: row.name,
                linksCount: row.linksCount,
                visitCount: row.visitCount
            };
        });

        return res.status(200).send(ranking);

    } catch(err){
        return res.status(500).send(err.message);
    }
}