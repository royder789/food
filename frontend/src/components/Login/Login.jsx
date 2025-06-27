import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Login.css'
import { useEffect } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";
const Login = ({setLogin}) => {

    const {url,token,setToken}=useContext(StoreContext);//backedn ka url agya next step


    const [current,setCurrent]=useState("Login")
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })
   //to take all the name and email and password
    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))

    }

    //for user login 
    const onLogin=async (event)=>{
      event.preventDefault();
      let newUrl=url;
      if(current=="Login"){
        newUrl+="/api/user/login"
      }
      else{
        newUrl+="/api/user/register"
      }
     
      const response=await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token);
        
        localStorage.setItem("token",response.data.token);
        setLogin(false);
      }
      else{
        alert(response.data.message);
      }


    }

   
  
  
  
    return (
    <div className='login'>
      <form onSubmit={onLogin} action="" className="login-container">
        <div className="login-title">
            <h2>{current}</h2>
            <img onClick={()=>setLogin(false)}src={assets.cross_icon} alt="" />
        </div>
        <div className="login-input">
            {current==="Login"?<></>:<input onChange={onChangeHandler} value={data.name} name='name' type="text" placeholder='Your Name' required />}
            
            <input onChange={onChangeHandler} value={data.email} name='email' type="text" placeholder='Your Email' required />
            <input onChange={onChangeHandler} value={data.password}name='password' type="password" placeholder='PassWord' required />
        </div>
        <button type='submit'>{current==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing,I agree to the terms of use & privacy policy.</p>

        </div>
        {current==="Login"?<p>Create a new account? <span onClick={()=>setCurrent("SignIn")}>Click here</span></p>:
        <p>Already have an account? <span onClick={()=>setCurrent("Login")}>Login here</span></p>}
        
        
      </form>
    </div>
  )
}

export default Login
