import {Request, Response} from "express";
import image, {IImage} from '../models/image';
import isEmpty from "is-empty";
import path from "path";
import sha1 from "sha1";

class ImageControllers {
    public async getImage (request: Request, response: Response){
        const {id} = request.params;
        const {filename} = request.params;
        var getI = await image.findOne({filename});
        if (!getI){
            response.status(300).json({serverResponse: "Error"})
            return;
        }
        if (getI.relativepath == null){
            response.status(300).json({serverResponse: "no existe la imagen"})
            return;
        }
        response.sendFile(getI.relativepath);
    }
    public async index (request: Request, response: Response){
        const img = await image.find({});
        response.json({message: "todos los archivos", serverResponse: img});
    }
    public async newImage (request: Request, response: Response){
        if (isEmpty(request.files)){
            response.status(300).json({ serverResponse: "No hay archivos adjuntos"});
            return;
        }
        var files: any = request.files;
        var file: any = files.filesup;
        var dir = `${__dirname}/../../files`;
        var filehash: string = sha1(new Date().toString()).substring(0,7);
        var newname: string = `${filehash}_${file.name}`;
        var totalpath = `${path.resolve(dir)}/${newname}`;
        const newImg = new image ({ path: path.resolve(dir), relativepath: totalpath, filename: newname});
        await newImg.save();
        file.mv(`${path.resolve(dir)}/${newname}`);
        response.status(300).json({ serverResponse: " subida  éxitosa", newImg});
    }
}

export const imageControllers = new ImageControllers();