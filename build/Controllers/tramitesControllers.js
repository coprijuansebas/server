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
const database_1 = __importDefault(require("../database"));
class TramitesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramites = yield database_1.default.query('SELECT * FROM tramites');
            res.json(tramites);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tramites = yield database_1.default.query('SELECT * FROM tramites WHERE id = ?', [id]);
            if (tramites.length > 0) {
                return res.json(tramites[0]);
            }
            res.status(404).json({ text: 'El tramite que busca no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tramites set ?', [req.body]);
            res.json({ text: 'Se ha creado un tramite' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tramites set ? WHERE id = ?', [req.body, id]);
            res.json({ mensaje: 'EL tramite a sido actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tramites WHERE id = ?', [id]);
            res.json({ text: req.params.id + 'Tramite a sido borrado' });
        });
    }
}
const tramitesControllers = new TramitesController;
exports.default = tramitesControllers;
