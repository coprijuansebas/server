"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database_1 = __importDefault(require("../database"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const result = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [userData.email]);
            if (result.length > 0) {
                const user = result[0]; //Informacion del Usuario ya guardada en la base de datos
                let validpassword = yield bcrypt.compare(userData.password, user.password);
                if (validpassword) {
                    let payload = { subject: userData.id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({ token });
                    // res.status(200).json({ welcome: 'Welcome ' + user.nombres + ' ' + user.apellidos });
                }
                else {
                    res.status(401).json('Invalid password');
                }
            }
            else {
                res.status(401).json('Invalid user');
            }
        });
    }
}
const loginControllers = new LoginController;
exports.default = loginControllers;
