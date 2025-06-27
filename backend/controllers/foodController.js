import foodModel from "../models/foodModel.js";
import fs from 'fs'
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save(); // save the food item
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }

    
};

//all gfood list
const listfood=async (req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods});
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"});
    }


}

//remove food item
//remove food item
const deletefood = async (req, res) => {
    try {
        console.log("Request ID:", req.body.id);
        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            console.log("Food item not found for ID:", req.body.id);
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.log("Failed to delete image file:", err);
            }
        });
        
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food item deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}



export  {addFood,listfood,deletefood};
