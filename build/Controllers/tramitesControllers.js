"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class TramitesController {
    index(req, res) {
        database_1.default.query('DESCRIBE tramites');
        res.json({ text: 'Listando los tramites' });
    }
    create(req, res) {
        res.json({ text: 'Creando un tramite' });
    }
    update(req, res) {
        res.json({ text: 'Actualizando un tramite ' + req.params.id });
    }
    delete(req, res) {
        res.json({ text: 'Borrando un tramite ' + req.params.id });
    }
}
const tramitesControllers = new TramitesController;
exports.default = tramitesControllers;
