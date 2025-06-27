import React, { useContext, useState, useEffect } from 'react';
import './display.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const Display = ({ category }) => {
  const { food_list, cart, setCart } = useContext(StoreContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductCard, setShowProductCard] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  // Sync quantity with cart when card opens
  useEffect(() => {
    if (selectedProduct && cart[selectedProduct._id]) {
      setQuantity(cart[selectedProduct._id]);
    } else if (selectedProduct) {
      setQuantity(1);
    }
  }, [selectedProduct, cart]);

  const handleProductClick = (item) => {
    setSelectedProduct(item);
    setShowProductCard(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProductCard = () => {
    setShowProductCard(false);
    document.body.style.overflow = 'auto';
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    if (selectedProduct) {
      setCart((prevCart) => ({
        ...prevCart,
        [selectedProduct._id]: newQuantity,
      }));
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      setCart((prevCart) => ({
        ...prevCart,
        [selectedProduct._id]: quantity,
      }));
      alert(`${quantity} ${selectedProduct.name}(s) added to cart for $${(selectedProduct.price * quantity).toFixed(2)}!`);
      closeProductCard();
    }
  };

  const submitReview = () => {
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview('');
    }
  };

  return (
    <div className='food-display'>
      <h2 className="section-title">Premium Culinary Selections Near You</h2>
      <p className="section-subtitle">Experience gastronomic excellence with our handcrafted dishes</p>
      
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <div 
                key={index} 
                onClick={() => handleProductClick(item)}
                className="food-item-wrapper"
              >
                <FoodItem 
                  id={item._id} 
                  name={item.name} 
                  description={item.description} 
                  price={item.price} 
                  image={item.image}
                  quantity={cart[item._id] || 0} // Display current cart quantity
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Premium Product Card Modal */}
      {showProductCard && selectedProduct && (
        <div className="product-card-overlay" onClick={closeProductCard}>
          <div className="product-card-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeProductCard}>
              ×
            </button>
            
            <div className="product-card">
              <div className="product-image-container">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="product-image"
                />
                <div className="image-overlay"></div>
              </div>
              
              <div className="product-details">
                <h3 className="product-name">{selectedProduct.name}</h3>
                <p className="product-price">${selectedProduct.price.toFixed(2)}</p>
                <p className="product-description">{selectedProduct.description}</p>
                
                <div className="quantity-selector">
                  <button 
                    onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
                </button>
                
                <div className="reviews-section">
                  <h4>Customer Reviews</h4>
                  <div className="review-input">
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="review-textarea"
                    />
                    <button onClick={submitReview} className="submit-review-btn">
                      Submit Review
                    </button>
                  </div>
                  
                  <div className="review-list">
                    {reviews.length > 0 ? (
                      reviews.map((item, index) => (
                        <div key={index} className="review-item">
                          <div className="reviewer-avatar">U</div>
                          <div className="review-content">
                            <p>{item}</p>
                            <div className="review-meta">
                              <span className="review-date">Today</span>
                              <div className="review-rating">★★★★★</div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-reviews">No reviews yet. Be the first to review!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;