import mongoose from "mongoose"
const userschema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        cartData:{type:Object,default:{}},
       

    },{minimize:false}//to store cartData as empty object
)
const UserModel=mongoose.models.user||mongoose.model('user',userschema);
export default UserModel;