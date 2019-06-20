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
class RegistrarController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM users');
            res.json(users);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
            if (users.length > 0) {
                return res.json(users[0]);
            }
            res.status(404).json({ text: 'El usuario que busca no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = {
                id: req.body.id,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                email: req.body.email,
                password: req.body.password
            };
            const result = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [userData.email]);
            if (result.length > 0) {
                res.status(200).json('Email already logged in');
            }
            else {
                const salt = yield bcrypt.genSalt(10);
                const hash = yield bcrypt.hash(userData.password, salt);
                userData.password = hash;
                yield database_1.default.query('INSERT INTO users SET ?', [userData]);
                let payload = { subject: userData.id };
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({ token });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
            res.json({ mensaje: 'EL usuario a sido actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM users WHERE id = ?', [id]);
            res.json({ text: req.params.id + 'usuario a sido borrado' });
        });
    }
}
const registrarControllers = new RegistrarController;
exports.default = registrarControllers;
