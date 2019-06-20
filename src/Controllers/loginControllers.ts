import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

import db from '../database';

class LoginController {
    public async login(req: Request, res: Response) {
        const userData = req.body;
        const result = await db.query('SELECT * FROM users WHERE email = ?', [userData.email]);
        if (result.length > 0) {
            const user = result[0]; //Informacion del Usuario ya guardada en la base de datos
            let validpassword = await bcrypt.compare(userData.password, user.password);
            if (validpassword) {
                let payload = { subject: userData.id }
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({ token });
                // res.status(200).json({ welcome: 'Welcome ' + user.nombres + ' ' + user.apellidos });
            } else {
                res.status(401).json('Invalid password');
            }
        } else {
            res.status(401).json('Invalid user');
        }
    }
}


const loginControllers = new LoginController;
export default loginControllers;