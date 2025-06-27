import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userModel from "./models/UserModel.js";
import userRouter from "./routes/UserRoute.js";
import 'dotenv/config' 
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/orderRoute.js";



//app config
const app=express()
const port=process.env.PORT||4001
//middel ware
app.use(express.json())//passing front to backend
app.use(cors())//accesss back from any front

//db connection
connectDB();


// api endpoint
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);





app.get("/",(req,res)=>{
    res.send("API working")
})
app.listen(port,()=>{
    console.log(`Server Statred on http://localhost:${port}`)
})
 //mongodb+srv://mihirthesupreme:272323@cluster0.cswwq.mongodb.net/?