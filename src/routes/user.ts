import { Router } from "express";
import { userControllers } from "../controllers/user";
import user from '../models/user';
import { jsonwebtokenSecurity } from "../libs/middleware";

const router = Router();

router.get("/", userControllers.index);
router.post("/logln", userControllers.logln);
router.post("/signUp", userControllers.signUp);// crear usuarios
router.put("/edit/:id", userControllers.edit);
router.delete("/delete/:id", userControllers.delete);
router.put("/postTouser/:idUser", userControllers.Postuser)
//router.get("/profile/:id", jsonwebtokenSecurity , userControllers.profile);
router.get("/getprofile/:id", jsonwebtokenSecurity, userControllers.getprofile);
router.post("/sendEmail",userControllers.sendEmail);

export default router;