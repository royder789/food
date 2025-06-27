import express from "express";
import {addFood,listfood,deletefood} from "../controllers/foodController.js";
import multer from "multer";//image storage

const foodRouter=express.Router();

//image storage engine
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)

    }

})
const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listfood);
foodRouter.post("/delete",deletefood);

export default foodRouter;
