import UserModel from "../models/UserModel.js";

//add itemss to user cart
const addtoCart=async (req,res)=>{
    try{
        let userData=await UserModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1;

        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Add to cart"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}
//fetchUser cart data
const getCart=async (req,res)=>{
    try{
        let userData=await UserModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData;
        res.json({success:true,cartData});

    }
    catch{
        console.log(error);
        res.josn({success:false,message:"Error"})  

    }

}

//remove from cart
const removefromCart=async(req,res)=>{
    try{
        //let userData=await UserModel.findById(req.body.userId);
        let userData=await UserModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId]-=1;

        }
       
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from the cart"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }

}

export {addtoCart,getCart,removefromCart}