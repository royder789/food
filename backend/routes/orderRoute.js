import express from "express"
import authMiddleWare from "../middleware/auth.js";

import { placeorder, userOrders, verifyOrder } from "../controllers/orderContoller.js";


const orderRouter=express.Router();

orderRouter.post("/place",authMiddleWare,placeorder);
orderRouter.post("/payment-success?status=true",authMiddleWare,verifyOrder);
orderRouter.post("/userorder",authMiddleWare,userOrders);
export default orderRouter; 