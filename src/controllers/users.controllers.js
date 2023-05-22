import { db } from "../database/database.connection.js";

export async function getUsers(req,res) {
    try{

        const userId = res.locals.user;

        const query = `SELECT registered.id, registered.name, SUM(urls.visitCount) AS totalVisitCount
        FROM registered
        LEFT JOIN urls ON urls.userId = registered.id
        WHERE registered.id=$1
        GROUP BY registered.id, registered.name
        ;`;

        const result = await db.query(query, [userId]);

        if(result.rows.length === 0){
            return res.sendStatus(404);
        }

        const userOn = result.rows[0];
        const totalVisitCount = userOn.totalVisitCount || 0;

        const shortenedUrls = await getShortenedUrls(userId);

        const responseData ={
            id: userOn.id,
            name: userOn.name,
            visitCount: totalVisitCount,
            shortenedUrls: shortenedUrls
        };

        return res.status(200).send(responseData);
    } catch(err){
        return res.status(500).send(err.message);
    }
}

async function getShortenedUrls(userId){
    const result = await db.query(` 
    SELECT "id", "shortUrl", "url", "visitCount" 
    FROM urls
    WHERE "userId"=$1
    ;`,[userId]);

    const shortenedUrls = result.rows.map(row => {
        return {
            id: row.id,
            shortUrl: row.shortUrl,
            url: row.url,
            visitCount: row.visitCount,
        };
    });

    return shortenedUrls;
}