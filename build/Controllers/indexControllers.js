"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ text: 'API es en /api/tramites' });
    }
}
exports.indexControllers = new IndexController;
