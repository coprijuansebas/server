"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrarControllers_1 = __importDefault(require("../controllers/registrarControllers"));
const jwt = require('jsonwebtoken');
class RegistrarRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    verifyToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauthorized request');
        }
        let payload = jwt.verify(token, 'secretKey');
        if (!payload) {
            return res.status(401).send('Unauthorized request');
        }
        req.userId = payload.subject;
        next();
    }
    config() {
        this.router.get('/', registrarControllers_1.default.list); //Toma todos los usuarios
        this.router.get('/:id', registrarControllers_1.default.getOne); //Toma un usuario
        this.router.post('/', registrarControllers_1.default.create); //Crea un usuario 
        this.router.put('/:id', registrarControllers_1.default.update); //Modifica un usuario
        this.router.delete('/:id', registrarControllers_1.default.delete); //Borra a un usuario
    }
}
const registrarRoute = new RegistrarRoutes();
exports.default = registrarRoute.router;
