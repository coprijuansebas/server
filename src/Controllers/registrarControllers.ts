import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import db from '../database';

class RegistrarController {

    public async  list(req: Request, res: Response) {
        const users = await db.query('SELECT * FROM users');
        res.json(users);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const users = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.status(404).json({ text: 'El usuario que busca no existe' });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const userData = {
            id: req.body.id,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: req.body.password
        }
        const result = await db.query('SELECT * FROM users WHERE email = ?', [userData.email]);
        if (result.length > 0) {
            res.status(200).json('Email already logged in');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(userData.password, salt);
            userData.password = hash;
            await db.query('INSERT INTO users SET ?', [userData]);
            let payload = { subject: userData.id}
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
        res.json({ mensaje: 'EL usuario a sido actualizado' });
    }


    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ text: req.params.id + 'usuario a sido borrado' });
    }


}


const registrarControllers = new RegistrarController;
export default registrarControllers;