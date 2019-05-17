import { Request ,Response } from 'express';

class IndexController{
    public  index ( req: Request , res:Response) {
        res.json({text: 'API es en /api/tramites' } )
    } 
}

export const indexControllers = new IndexController;