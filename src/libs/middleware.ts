import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';

export const jsonwebtokenSecurity = async (request: Request, response: Response, next: NextFunction) => {
    var jsontoken = request.headers["authorization"];
    if (!jsontoken){
        response.status(300).json({serverResponse: "No tiene acceso a este servicio, acceso denegado"});
        return;
    }
    try{
        const payload = jwt.verify(jsontoken, "security");
        if (payload){
            console.log(payload);
            return next();
        }
    }
    catch(e){
        return response.json({serverResponse: "token invalido"});
    }
}