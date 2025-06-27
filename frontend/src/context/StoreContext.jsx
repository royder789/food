// StoreContext.js
import { createContext, useEffect, useState } from 'react';
import { food_list } from '../assets/assets';
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    //to connect backend with fromnte ndf we have to create a url 
    const url="http://localhost:4001";

    const [token,setToken]=useState("");
    const [foodlist,setFoodList]=useState([]);





    const [cart,setCart]= useState({});
    const addtoCart= async (itemId)=>{
        if(!cart[itemId]){
            setCart((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCart((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeCart=async (itemId)=>{
        setCart((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    
    }
    const loadCartData=async (token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCart(response.data.cartData);

}

    {/*useEffect(()=>{
        console.log(cart);

    },[cart])*/}


    /*when cart is changed this effect will be then clg*/
    
    const cartTotal=()=>{
        let totalAmount=0;
        for(const item in cart)
        {
            if(cart[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item)
                totalAmount+=itemInfo.price*cart[item];

            }

        }
        return totalAmount;
    }

    const fetchFoodList=async ()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }


    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }

        }
        loadData()
    },[])


    const contextValue = {
        food_list,
        token,
        cart,
        setCart,
        addtoCart,
        removeCart,
        cartTotal,
        url,
        
        setToken

    };
    

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
