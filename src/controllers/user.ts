import { Request, Response } from 'express';
import {Request, Response} from "express";
import user, {IUser} from "../models/user";
import post, {IPost} from "../models/post";
import sha1 from "sha1";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

interface Icredencial{
  email: string;
  password: string;
}


class UserControllers {
  public async index(req: Request, res: Response) {
    const users = await User.find({});
    res.json({ message: "all users", users });
  }
  public async profile(req: Request, res: Response) {
    const { id } = req.params;
    const findUser = await User.findById(id);
    res.json({ message: "my profile", findUser });
  }

  
  public async signUp(req: Request, res: Response) {
    const { fullname,username, email, password }=req.body;
    const nUser = new User(req.body);
    nUser["createdAt"] = new Date();
    nUser["password"] = sha1(nUser["password"]);
    await nUser.save();
    res.status(201).json({message: "usuario registrado", serverResponse: nUser});
  }


  public async logln (request: Request, response: Response){
    const {email, password} = request.body;
    var encri: string = sha1(password);
    const result = await user.findOne({email});
    if (result){
       if (result.password == encri){
            var token: string = jwt.sign ({id: result.id, email: result.email}, "security");
            response.status(200).json({serverResponse: "logedIn successfully", token}); 
        }   
    }
    response.status(300).json({serverResponse: "Credenciales incorrectas", encri});
    console.log(encri)
  }
  public async edit(req: Request, res: Response) {
    const { id } = req.params;
    const { fullname, username, email, password } = req.body;
    const eUser = await User.findByIdAndUpdate(id,req.body);
    res.json({ message: "usuario actualizado" });
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const dUser = await User.findByIdAndDelete(id);
    res.json({ message: "usuario eliminado" });
  }
  public async Postuser (req:Request, res: Response){
    const {idU} = req.params;
    const {idP} = req.body;
    let userT = await user.findById(idU);
    let posT = await post.findById(idP);
    if (userT != null && posT != null){
        userT.post.push(posT);
        userT.save();
        res.status(300).json({message: "post asignado exitosamente a este usuario"});
    } 
    res.status(300).json({message: "parametros nulos"});
  }
  public async getprofile (req: Request, res: Response){
    const {id} = req.params;
    const getU = await user.findById(id);
    res.status(200).json({message: "profile", serverResponse: getU});
  }
  public async sendEmail (req: Request, res: Response){
    const {to, subject, text} = req.body;
    var transporter = nodemailer.createTransport({
        host: "practica.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user:"taliabeltran.123@gmail.com",
            pass:"talia123",
        },
    });
    var mailOptions ={
        from: "taliabeltran.123@gmail.com",
        to: "noemicoronado@gmail.com",
        subject: "this is my test for the assignment",
        text: "prueba Practica 8 ",
        attachments: [{
            path: "/opt/app/files/noche.jpeg",
        }]
    };
    transporter.sendMail(mailOptions, function ( error, info){
        if (error){
            res.status(500).json({message: "Error"}); 
        }else{
            res.status(200).json({message: "E-mail se envio  con éxito", serverResponse: mailOptions});
        }
    });
}    
}
export const userControllers = new UserControllers();