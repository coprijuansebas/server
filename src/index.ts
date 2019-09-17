import express, { Application } from 'express'
import morgan from 'morgan';
import cors from 'cors';
const jwt = require('jsonwebtoken');


import IndexRoute from './Routes/indexRoutes';
import TramitesRoute from './Routes/tramitesRoutes';
import imagenesRoutes from './Routes/imagenesRoutes';
import loginRoutes from './Routes/loginRoutes';
import registrarRoutes from './Routes/registrarRoutes';


class Server {

	public app: Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}


	config(): void {
		this.app.set('port', process.env.PORT || 5000);
		this.app.use(morgan('dev'));
		this.app.use(cors({credentials: true, origin: 'https://coprised.000webhostapp.com'}));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', 'https://coprised.000webhostapp.com');
			res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept');
			res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
			next();
		});
		
	}

	routes(): void {
		this.app.use('/', IndexRoute);
		this.app.use('/api/tramites', TramitesRoute);
		this.app.use('/api/imagenes', imagenesRoutes);
		this.app.use('/api/registrar', registrarRoutes);
		this.app.use('/api/login', loginRoutes);
	}

	start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log('server on port', this.app.get('port'));
		});
	}

	verifyToken(req:any, res:any, next:any){
        if(!req.headers.authorization){
            return res.status(401).send('Unauthorized request')
        }
        let token = req.headers.authorization.split(' ')[1]
        let payload = jwt.verify(token, 'secretKey');
        if(!payload){
            return res.status(401).send('Unauthorized request')
        }
        req.userId = payload.subject
        next();
    }


}

const server = new Server;
server.start();

