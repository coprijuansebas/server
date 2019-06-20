"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ text: 'API es en /api/tramites',
            imagenes: 'API es en /api/imagenes',
            login: 'API en /api/login',
            registrar: 'API en /api/registrar' });
    }
}
exports.indexControllers = new IndexController;
