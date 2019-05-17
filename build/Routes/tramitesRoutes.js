"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tramitesControllers_1 = __importDefault(require("../controllers/tramitesControllers"));
class TramitesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tramitesControllers_1.default.index);
        this.router.post('/', tramitesControllers_1.default.create);
        this.router.put('/:id', tramitesControllers_1.default.update);
        this.router.delete('/:id', tramitesControllers_1.default.delete);
    }
}
const tramitesRoute = new TramitesRoutes();
exports.default = tramitesRoute.router;
