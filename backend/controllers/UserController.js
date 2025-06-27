
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"//to check the correct fomrat of email
import UserModel from '../models/UserModel.js'


//logi user

const JWT_SECRET="twentysixthmay"
const createToken=(id)=>{
    return jwt.sign({id},JWT_SECRET)
}

export const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if (!user){
            return res.json({success:false,message:"Enter correct credentials"});

        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Enter correct credentials"})
        }

        const token=createToken(user._id);
        return res.json({success:true,token})
    }
    catch(error){
        console.log(error);
        return res.json({success:false,message:"server error"})

    }

}

//register user
export const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if user already exists
        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "Choose a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
        });

        // Save user to database
        const user = await newUser.save();
        const token=createToken(user._id)
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ success: false, message: error.message || "An error occurred" });
    }
};
