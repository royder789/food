import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiArrowRight, FiTag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Cart.css';

const Cart = () => {
    const { cart, food_list, removeCart, cartTotal, url } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className='cart-container'>
            <motion.div 
                className="cart-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Your Shopping Cart</h1>
                <p className='cart-subtitle'>Review your selections before checkout</p>
            </motion.div>

            <div className="cart-content">
                <div className="cart-items">
                    <div className="cart-items-header">
                        <span>Product</span>
                        <span>Details</span>
                        <span>Qty</span>
                        <span>Price</span>
                        <span>Remove</span>
                    </div>

                    <div className="cart-items-list">
                        <AnimatePresence>
                            {food_list.map((item, index) => {
                                if (cart[item._id] > 0) {
                                    return (
                                        <motion.div 
                                            key={item._id}
                                            className="cart-item"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="cart-item-content">
                                                <div className="product-image">
                                                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                                                </div>
                                                <div className="product-details">
                                                    <h3>{item.name}</h3>
                                                    <p>${item.price} each</p>
                                                </div>
                                                <div className="product-quantity">
                                                    <span>{cart[item._id]}</span>
                                                </div>
                                                <div className="product-total">
                                                    ${(item.price * cart[item._id]).toFixed(2)}
                                                </div>
                                                <motion.button 
                                                    className="remove-btn"
                                                    onClick={() => removeCart(item._id)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FiTrash2 />
                                                </motion.button>
                                            </div>
                                            <div className="item-divider"></div>
                                        </motion.div>
                                    )
                                }
                                return null;
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="cart-summary">
                    <motion.div 
                        className="promo-section"
                        whileHover={{ y: -2 }}
                    >
                        <div className="promo-header">
                            <FiTag className="promo-icon" />
                            <h3>Promo Code</h3>
                        </div>
                        <p>Enter your promo code for special discounts</p>
                        <div className="promo-input-container">
                            <input 
                                type="text" 
                                placeholder='Enter promo code' 
                                className="promo-input"
                            />
                            <motion.button 
                                className="promo-submit"
                                whileHover={{ backgroundColor: '#333' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Apply
                            </motion.button>
                        </div>
                    </motion.div>

                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${cartTotal().toFixed(2)}</span>
                        </div>
                        
                        <div className="summary-row">
                            <span>Delivery Fee</span>
                            <span>${cartTotal() === 0 ? '0.00' : '2.00'}</span>
                        </div>
                        
                        <div className="summary-divider"></div>
                        
                        <div className="summary-total">
                            <span>Total</span>
                            <span>${cartTotal() === 0 ? '0.00' : (cartTotal() + 2).toFixed(2)}</span>
                        </div>

                        <motion.button 
                            className="checkout-btn"
                            onClick={() => navigate('/order')}
                            whileHover={{ 
                                backgroundColor: '#d1382e',
                                boxShadow: '0 10px 20px rgba(210, 56, 46, 0.3)'
                            }}
                            whileTap={{ scale: 0.97 }}
                            disabled={cartTotal() === 0}
                        >
                            Proceed to Checkout
                            <FiArrowRight className="arrow-icon" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;