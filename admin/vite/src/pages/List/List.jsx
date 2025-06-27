import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const List = () => {
  const url = "http://localhost:4001";


  const [list,setList]=useState([]);



  const fetchlist= async (event)=>{
    
    const response= await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success){
      setList(response.data.data)
      
    }
    else{
      toast.error("error")
    
    }
  }

  const removefood=async (foodId)=>{
    const response=await axios.post(`${url}/api/food/delete`,{id:foodId});

    await fetchlist();
    if(response.data.success){
      toast.success("Item Deleted");

    }
    else{
      toast.error(error)
    }

    
  }

  useEffect(()=>{
    fetchlist()
  },[])
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="format title">
          <b>Image</b>
          
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b >Action</b>
          
          
          
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className='cursor' onClick={()=>removefood(item._id)}>x</p>
               

            </div>
          )
        })}
      </div>


    </div>
      
 
  )
}

export default List
