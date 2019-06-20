import { Router } from 'express';
import registrarControllers from '../controllers/registrarControllers';
const jwt = require('jsonwebtoken');


class RegistrarRoutes{

	public router: Router= Router ();
	constructor() {
		this.config(); 
	}

	verifyToken(req:any, res:any, next:any){
        if(!req.headers.authorization){
            return res.status(401).send('Unauthorized request')
        }
        let token = req.headers.authorization.split(' ')[1]
        if(token === 'null'){
            return res.status(401).send('Unauthorized request')
        }
        let payload = jwt.verify(token, 'secretKey');
        if(!payload){
            return res.status(401).send('Unauthorized request')
        }
        req.userId = payload.subject
        next();
    }

	config(): void {
		this.router.get('/', registrarControllers.list); //Toma todos los usuarios
		this.router.get('/:id', registrarControllers.getOne); //Toma un usuario
		this.router.post('/', registrarControllers.create); //Crea un usuario 
		this.router.put('/:id', registrarControllers.update); //Modifica un usuario
		this.router.delete('/:id', registrarControllers.delete); //Borra a un usuario
		
	}

}


const registrarRoute = new RegistrarRoutes();
export default registrarRoute.router;