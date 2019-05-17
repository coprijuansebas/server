import  express, { Application } from 'express'
import morgan from 'morgan';
import cors from 'cors';



 import  IndexRoute from './Routes/indexRoutes';
 import TramitesRoute from './Routes/tramitesRoutes'; 

 

 class Server{

 	public app: Application; 

 	constructor(){
 		this.app = express();
 		this.config();
 		this.routes(); 
	 }
	 

 	config(): void{
		 this.app.set('port', process.env.PORT || 5000);
		 this.app.use(morgan('dev'));
		 this.app.use(cors());
		 this.app.use(express.json());
		 this.app.use(express.urlencoded({ extended: false }));
 	}

 	routes(): void{
		this.app.use('/', IndexRoute);
		this.app.use('/api/tramites', TramitesRoute);
 	}
	  
	 start(): void{
 		this.app.listen(this.app.get('port'), () => {
 			console.log('server on port', this.app.get('port'));
 		});
 	}


 }

 const server = new Server;
 server.start();

