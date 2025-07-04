import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from "axios";
import { toast } from 'react-toastify';
const Add = () => {

    const url = "http://localhost:4001";
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",


    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => (
            {
                ...data, [name]: value

            }
        )
        )
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", Number(data.price));
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad",

            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }
    /* useEffect(()=>{
       console.log(data);
   
     },[data])*/

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="flex-col img-upload ">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />

                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here........' />


                </div>
                <div className="add-description flex-col">
                    <p>Product Descriptiion</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here........' required></textarea>
                </div>


                <div className="category-price">
                    <div className="add-category">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} value={data.category} name="category" >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Vef</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>

                        </select>

                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$' />

                    </div>


                </div>
                <button type='Submit' className='add-btn'>ADD</button>

            </form>

        </div>
    )
}

export default Add
