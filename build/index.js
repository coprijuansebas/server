"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const jwt = require('jsonwebtoken');
const indexRoutes_1 = __importDefault(require("./Routes/indexRoutes"));
const tramitesRoutes_1 = __importDefault(require("./Routes/tramitesRoutes"));
const imagenesRoutes_1 = __importDefault(require("./Routes/imagenesRoutes"));
const loginRoutes_1 = __importDefault(require("./Routes/loginRoutes"));
const registrarRoutes_1 = __importDefault(require("./Routes/registrarRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default({ credentials: true, origin: 'http://localhost:4200' }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
            next();
        });
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/tramites', tramitesRoutes_1.default);
        this.app.use('/api/imagenes', imagenesRoutes_1.default);
        this.app.use('/api/registrar', registrarRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
    verifyToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }
        let token = req.headers.authorization.split(' ')[1];
        let payload = jwt.verify(token, 'secretKey');
        if (!payload) {
            return res.status(401).send('Unauthorized request');
        }
        req.userId = payload.subject;
        next();
    }
}
const server = new Server;
server.start();
