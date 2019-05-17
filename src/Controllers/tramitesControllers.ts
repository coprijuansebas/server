import { Request , Response } from 'express';

import db from '../database';

class TramitesController{

    public async  list ( req: Request , res:Response) {
        const tramites = await db.query('SELECT * FROM tramites');
        res.json(tramites);
    } 

    public async getOne ( req: Request , res:Response): Promise<any>{
        const { id } = req.params;
        const tramites = await db.query('SELECT * FROM tramites WHERE id = ?', [id]);
        if(tramites.length > 0){
            return res.json(tramites[0]);
        }
        res.status(404).json({ text: 'El tramite que busca no existe'});
    } 

    public async create ( req: Request , res: Response ): Promise<void>{
        await db.query('INSERT INTO tramites set ?', [req.body]);
        res.json( {text: 'Se ha creado un tramite'} );
    }

    public async update ( req: Request , res: Response ): Promise<void>{
        const { id } = req.params;
        await db.query('UPDATE tramites set ? WHERE id = ?', [req.body, id]);
        res.json({mensaje: 'EL tramite a sido actualizado'});
    }

 
    public async delete ( req: Request , res: Response ): Promise<void>{
        const { id } = req.params;
        await db.query('DELETE FROM tramites WHERE id = ?', [id]);
        res.json({text: req.params.id + 'Tramite a sido borrado'});
    }

}


const tramitesControllers = new TramitesController;
 export  default tramitesControllers;