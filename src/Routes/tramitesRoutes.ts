import { Router } from 'express';
import tramitesControllers from '../controllers/tramitesControllers';


class TramitesRoutes{

	public router: Router= Router ();
	constructor() {
		this.config(); 
	}

	config(): void {
		this.router.get('/', tramitesControllers.index);
		this.router.post('/', tramitesControllers.create);
		this.router.put('/:id', tramitesControllers.update);
		this.router.delete('/:id', tramitesControllers.delete);
	
	}

}


const tramitesRoute = new TramitesRoutes();
export default tramitesRoute.router;