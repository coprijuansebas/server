"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagenesControllers_1 = __importDefault(require("../controllers/imagenesControllers"));
var multer = require('multer');
var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/git/Coprised_2/Client/src/assets/imagenes');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    }
});
var upload = multer({ storage: store }).single('file');
class ImagenesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', imagenesControllers_1.default.list); //Tomar todas las imagenes el contenido
        this.router.get('/banner', imagenesControllers_1.default.listb); //Tomar todas las imagenes de imagesb(BANNER)
        this.router.get('/conocenos', imagenesControllers_1.default.listc); //Tomar todas las imagenes de imagesc(CONOCENOS)
        this.router.get('/:id', imagenesControllers_1.default.getOne); //Tomar una imagen
        this.router.post('/upload', imagenesControllers_1.default.create); //Crea una imagen nueva
        this.router.post('/banner', imagenesControllers_1.default.createb); //Crea una imagen nueva
        this.router.post('/conocenos', imagenesControllers_1.default.createc); //Crea una imagen nueva
        this.router.put('/:id', imagenesControllers_1.default.update); //Modifica una imagen
        this.router.delete('/:id', imagenesControllers_1.default.delete); //Borra una imagen
    }
}
const imagenesRoute = new ImagenesRoutes();
exports.default = imagenesRoute.router;
