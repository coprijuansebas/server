import { Router } from 'express';
import imagenesControllers from '../controllers/imagenesControllers';
var multer = require('multer');




var store = multer.diskStorage({
    destination: function(req:any, file:any, cb:any){
        cb(null, 'D:/git/Coprised_2/Client/src/assets/imagenes');
    },
    filename: function(req:any, file:any, cb:any){
        cb(null, Date.now() + '.'+ file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

class ImagenesRoutes{

	public router: Router= Router ();
	constructor() {
		this.config(); 
	}

	config(): void {
		this.router.get('/', imagenesControllers.list); //Tomar todas las imagenes el contenido
		this.router.get('/banner', imagenesControllers.listb); //Tomar todas las imagenes de imagesb(BANNER)
		this.router.get('/conocenos', imagenesControllers.listc); //Tomar todas las imagenes de imagesc(CONOCENOS)
		this.router.get('/:id', imagenesControllers.getOne); //Tomar una imagen
		this.router.post('/upload', imagenesControllers.create); //Crea una imagen nueva
		this.router.post('/banner', imagenesControllers.createb); //Crea una imagen nueva
		this.router.post('/conocenos', imagenesControllers.createc); //Crea una imagen nueva
		this.router.put('/:id', imagenesControllers.update); //Modifica una imagen
		this.router.delete('/:id', imagenesControllers.delete); //Borra una imagen
	
	}

}


const imagenesRoute = new ImagenesRoutes();
export default imagenesRoute.router;