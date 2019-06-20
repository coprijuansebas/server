import { Request ,Response } from 'express';

class IndexController{
    public  index ( req: Request , res:Response) {
        res.json({text: 'API es en /api/tramites', 
                  imagenes: 'API es en /api/imagenes',
                  login: 'API en /api/login',
                  registrar: 'API en /api/registrar'} )
    } 
}

export const indexControllers = new IndexController;