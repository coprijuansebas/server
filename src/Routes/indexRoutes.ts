import { Router } from 'express';
import {indexControllers} from '../controllers/indexControllers';


class IndexRoutes{

	public router: Router = Router ();
	constructor() {
		this.config(); 
	}

	config(): void {
		this.router.get('/', indexControllers.index);
	}

}


const indexRoute = new IndexRoutes();
export default indexRoute.router; 