import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiMapPin, FiPhone, FiMail, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { cartTotal, token, food_list, cart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!data.firstName.trim()) errors.firstName = 'First name is required';
    if (!data.lastName.trim()) errors.lastName = 'Last name is required';
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email is required';
    if (!data.street.trim()) errors.street = 'Street address is required';
    if (!data.city.trim()) errors.city = 'City is required';
    if (!data.state.trim()) errors.state = 'State is required';
    if (!data.zip.trim()) errors.zip = 'ZIP code is required'; // ← relaxed validation here
    if (!data.country.trim()) errors.country = 'Country is required';
    if (!data.phone.match(/^[\d\s\-()+]{10,}$/)) errors.phone = 'Valid phone number is required';
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    let orderItems = [];
    
    food_list.forEach((item) => {
      if (cart[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cart[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    const orderData = {
      items: orderItems,
      amount: cartTotal() + 2,
      address: data
    };
  
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (cartTotal() === 0) {
      navigate('/cart');
    }
  }, [token, cartTotal, navigate]);

  return (
    <motion.div 
      className="place-order-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="order-header">
        <h1>Complete Your Order</h1>
        <p className="order-subtitle">Final step before enjoying your delicious meal</p>
      </div>

      <form className="place-order-form" onSubmit={placeOrder}>
        <div className="form-section delivery-info">
          <div className="section-header">
            <FiMapPin className="section-icon" />
            <h2>Delivery Information</h2>
          </div>

          <div className="form-grid">
            <div className={`form-group ${formErrors.firstName ? 'error' : ''}`}>
              <label>
                <FiUser className="input-icon" />
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={data.firstName}
                onChange={onChangeHandler}
                className={formErrors.firstName ? 'error-input' : ''}
              />
              {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
            </div>

            <div className={`form-group ${formErrors.lastName ? 'error' : ''}`}>
              <label>
                <FiUser className="input-icon" />
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={data.lastName}
                onChange={onChangeHandler}
                className={formErrors.lastName ? 'error-input' : ''}
              />
              {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
            </div>

            <div className={`form-group ${formErrors.email ? 'error' : ''}`}>
              <label>
                <FiMail className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={data.email}
                onChange={onChangeHandler}
                className={formErrors.email ? 'error-input' : ''}
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>

            <div className={`form-group ${formErrors.phone ? 'error' : ''}`}>
              <label>
                <FiPhone className="input-icon" />
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={data.phone}
                onChange={onChangeHandler}
                className={formErrors.phone ? 'error-input' : ''}
              />
              {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
            </div>

            <div className={`form-group full-width ${formErrors.street ? 'error' : ''}`}>
              <label>
                <FiMapPin className="input-icon" />
                Street Address
              </label>
              <input
                type="text"
                name="street"
                placeholder="123 Main St"
                value={data.street}
                onChange={onChangeHandler}
                className={formErrors.street ? 'error-input' : ''}
              />
              {formErrors.street && <span className="error-message">{formErrors.street}</span>}
            </div>

            <div className={`form-group ${formErrors.city ? 'error' : ''}`}>
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="New York"
                value={data.city}
                onChange={onChangeHandler}
                className={formErrors.city ? 'error-input' : ''}
              />
              {formErrors.city && <span className="error-message">{formErrors.city}</span>}
            </div>

            <div className={`form-group ${formErrors.state ? 'error' : ''}`}>
              <label>State/Province</label>
              <input
                type="text"
                name="state"
                placeholder="NY"
                value={data.state}
                onChange={onChangeHandler}
                className={formErrors.state ? 'error-input' : ''}
              />
              {formErrors.state && <span className="error-message">{formErrors.state}</span>}
            </div>

            <div className={`form-group ${formErrors.zip ? 'error' : ''}`}>
              <label>ZIP/Postal Code</label>
              <input
                type="text"
                name="zip"
                placeholder="10001"
                value={data.zip}
                onChange={onChangeHandler}
                className={formErrors.zip ? 'error-input' : ''}
              />
              {formErrors.zip && <span className="error-message">{formErrors.zip}</span>}
            </div>

            <div className={`form-group ${formErrors.country ? 'error' : ''}`}>
              <label>Country</label>
              <input
                type="text"
                name="country"
                placeholder="United States"
                value={data.country}
                onChange={onChangeHandler}
                className={formErrors.country ? 'error-input' : ''}
              />
              {formErrors.country && <span className="error-message">{formErrors.country}</span>}
            </div>
          </div>
        </div>

        <div className="form-section order-summary">
          <div className="section-header">
            <FiCheckCircle className="section-icon" />
            <h2>Order Summary</h2>
          </div>

          <div className="summary-card">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>$2.00</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>${(cartTotal() + 2).toFixed(2)}</span>
            </div>

            <motion.button 
              type="submit"
              className="payment-button"
              whileHover={{ 
                backgroundColor: '#d1382e',
                boxShadow: '0 10px 20px rgba(210, 56, 46, 0.3)'
              }}
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              <FiArrowRight className="arrow-icon" />
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PlaceOrder;