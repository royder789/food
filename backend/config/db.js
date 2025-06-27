import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://mihirthesupreme:272323@cluster0.cswwq.mongodb.net/food').then(()=>console.log("db connected"));

}
