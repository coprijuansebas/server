import { Request , Response } from 'express';

import db from '../database';

class TramitesController{

    public  index ( req: Request , res:Response) {
        db.query('DESCRIBE tramites');
        res.json( {text: 'Listando los tramites'});
    } 

    public create ( req: Request , res: Response ){
        res.json( {text: 'Creando un tramite'} );
    }

    public update ( req: Request , res: Response ){
        res.json( {text: 'Actualizando un tramite ' + req.params.id } );
    }

 
    public delete ( req: Request , res: Response ){
        res.json( {text: 'Borrando un tramite '  + req.params.id } );
    }

}


const tramitesControllers = new TramitesController;
 export  default tramitesControllers;