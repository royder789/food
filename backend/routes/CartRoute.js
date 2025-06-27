import express from "express"


import { addtoCart, getCart, removefromCart } from "../controllers/CartController.js";
import authMiddleWare from "../middleware/auth.js";

const cartRouter=express.Router();




cartRouter.post("/add",authMiddleWare,addtoCart);
cartRouter.post("/remove",authMiddleWare,removefromCart);
cartRouter.post("/get",authMiddleWare,getCart);

export default cartRouter;
