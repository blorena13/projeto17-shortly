import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signup(req, res) {

    const { name, email, password, confirmPassword } = req.body;

    try {
        const existsEmail = await db.query(`SELECT * FROM registered WHERE email=$1;`, [email]);
        if (existsEmail.rows.length !== 0) {
            return res.status(409).send("Email já cadastrado!");
        }

        const hash = bcrypt.hashSync(password, 10);

        await db.query(`INSERT INTO registered (name, email, password) VALUES ($1, $2, $3);`, [name, email, hash]);
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signin(req, res) {

    const { email, password } = req.body;
    try {
        const existsUser = await db.query(`SELECT * FROM registered WHERE email=$1;`, [email]);
        if (existsUser.rows.length === 0) {
            return res.status(401).send("Email não compatível.");
        }
        const user = existsUser.rows[0];
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
            return res.status(401).send("Senha inválida;");
        }
        const token = uuid();
        const userId = existsUser.rows[0].id;
        await db.query(`INSERT INTO login (token, userId) VALUES ($1, $2);`, [token, userId]);
        res.status(200).send({token});

    } catch (err) {
        res.status(500).send(err.message);
    }
}