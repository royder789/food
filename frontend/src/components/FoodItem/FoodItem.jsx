import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id, name, price, description, image}) => {
    const { cart, setCart, removeCart, addtoCart } = useContext(StoreContext);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className='food-item'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="food-item-image-container">
                <img 
                    className='food-item-image' 
                    src={image} 
                    alt={name} 
                    style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
                    }}
                />
                <div className="food-item-overlay"></div>
                
                {!cart[id] ? (
                    <button 
                        className='add-to-cart-btn'
                        onClick={() => addtoCart(id)}
                        style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateY(0)' : 'translateY(20px)'
                        }}
                    >
                        <img src={assets.add_icon_green} alt="Add to cart"/>
                        <span>Add</span>
                    </button>
                ) : (
                    <div 
                        className="food-item-counter"
                        style={{
                            opacity: isHovered ? 1 : 0.9,
                            transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
                        }}
                    >
                        <button onClick={() => removeCart(id)}>
                            <img src={assets.remove_icon_red} alt="Remove" />
                        </button>
                        <p>{cart[id]}</p>
                        <button onClick={() => addtoCart(id)}>
                            <img src={assets.add_icon_green} alt="Add" />
                        </button>
                    </div>
                )}
            </div>

            <div className="food-item-info">
                <div className="food-item-header">
                    <h3 className="food-item-name">{name}</h3>
                    <div className="food-item-rating">
                        <img src={assets.rating_starts} alt="Rating" />
                        <span className="rating-text">4.5</span>
                    </div>
                </div>
                
                <p className="food-item-desc">
                    {description}
                </p>
                
                <div className="food-item-footer">
                    <p className="food-item-price">
                        ${price.toFixed(2)}
                    </p>
                    {cart[id] && (
                        <div className="in-cart-indicator">
                            <span>{cart[id]} in cart</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FoodItem;