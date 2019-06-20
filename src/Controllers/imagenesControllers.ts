import { Request, Response } from 'express';
var multer = require('multer');
import db from '../database';



var store = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'D:/git/Coprised_2/Client/src/assets/imagenes');
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.originalname);
    }
});


var upload = multer({ storage: store,
limits:{
    fileSize: 10485760
}}).single('file');

class ImagenesController {

    // CARUSEL
    public async  list(req: Request, res: Response) {
        const imagenes = await db.query('SELECT * FROM images');
        res.json(imagenes);
    }

    // BANNER
    public async  listb(req: Request, res: Response) {
        const imagenes = await db.query('SELECT * FROM imagesb');
        res.json(imagenes);
    }

    // CONOCENOS
    public async  listc(req: Request, res: Response) {
        const imagenes = await db.query('SELECT * FROM imagesc');
        res.json(imagenes);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const tramites = await db.query('SELECT * FROM images WHERE id = ?', [id]);
        if (tramites.length > 0) {
            return res.json(tramites[0]);
        }
        res.status(404).json({ text: 'La imagen que busca no existe' });
    }

    // CAROUSEL
    // Guardar imagen en la ruta del dsico duro y guardar nombre en base de datos para recuperarlo mas tarde 
    public create(req: any, res: any, next: any) {
        upload(req, res, async (err: any): Promise<any> => {
            if (err) {
                return res.status(501).json({ error: err });
            } else {
                console.log(req.file.originalname);
                await db.query("INSERT INTO images (`image`) VALUES ('" + req.file.originalname + "')");
                return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
            }
        });
    }

    // BANNER
    public createb(req: any, res: any, next: any) {
        upload(req, res, async (err: any): Promise<any> => {
            if (err) {
                return res.status(501).json({ error: err });
            } else {
                await db.query("UPDATE imagesb SET image='" + req.file.originalname + "' WHERE id = 1");
                return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
            }
        });
    }

    // CONOCENOS
    public createc(req: any, res: any, next: any) {
        upload(req, res, async (err: any): Promise<any> => {
            if (err) {
                return res.status(501).json({ error: err });
            } else {
                await db.query("UPDATE imagesc SET image='" + req.file.originalname + "' WHERE id = 1");
                return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
            }
        });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE images set ? WHERE id = ?', [req.body, id]);
        res.json({ mensaje: 'La imagen a sido actualizada' });
    }


    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM images WHERE id = ?', [id]);
        res.json({ text: req.params.id + 'imagen a sido borrado' });
    }

}


const imagenesControllers = new ImagenesController;
export default imagenesControllers;