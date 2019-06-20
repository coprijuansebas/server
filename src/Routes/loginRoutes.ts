import { Router } from 'express';
import loginControllers from '../controllers/loginControllers';


class LoginRoutes{

	public router: Router= Router ();
	constructor() {
		this.config(); 
	}

	config(): void {
		this.router.post('/', loginControllers.login); //Realizar login
	
	}

}


const loginRoute = new LoginRoutes();
export default loginRoute.router;