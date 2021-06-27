import {  Router } from "express";
import {  imageControllers } from "../controllers/Image";
import image from '../models/image';

const router = Router();

router.get("/", imageControllers.index);
router.get("/getImage/:filename", imageControllers.getImage);
router.post("/new", imageControllers.newImage);

export default router;