import React, { useState, useEffect } from 'react';
import './Header.css';
import { assets } from '../../assets/assets';

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  
  // Premium image slideshow
  const slides = [
    {
      image: 'https://www.railwaycitytourism.com/uploads/2/1/4/9/21492992/saltandpeppermeals-372040839-261672456751686-4699306193995949183-n_orig.jpg',
      title: "Artisanal Cuisine Crafted with Passion",
      subtitle: "Experience flavors that tell a story"
    },
    {
      image: 'https://stkittsnevis.net/wp-content/uploads/2024/04/Sustainable-Dining-Nevis-Farm-to-Table-Restaurants.webp',
      title: "Seasonal Ingredients, Timeless Taste",
      subtitle: "Farm-to-table freshness in every bite"
    },
    {
      image: 'https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2022/10/THEME_FOOD_INDIAN-CUISINE-GettyImages-526749337-1.jpg',
      title: "Elevated Dining Experience",
      subtitle: "Where innovation meets tradition"
    }
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Slide indicators
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='header'>
      {/* Background slideshow */}
      <div className="slideshow">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
          </div>
        ))}
      </div>
      
      {/* Header content */}
      <div className='header-content'>
        <div className="text-content">
          <h2 className="title-animate">{slides[currentSlide].title}</h2>
          <p className="subtitle-animate">{slides[currentSlide].subtitle}</p>
          
          <div className="cta-container">
          <button 
            className="menu-button"
            onClick={() => document.getElementById('explore-menu')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
          >
            View Menu
            <span className="button-icon">
              {isMenuHovered ? '→' : '↓'}
            </span>
          </button>
            
            <div className="social-proof">
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span className="review-count">500+ Reviews</span>
              </div>
              <div className="awards">
                <span className="award-badge">Michelin Guide 2024</span>
                <span className="award-badge">Top 10 Restaurants</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slide indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Reservation quick form */}

      </div>
      
      {/* Scrolling marquee for special offers */}
      <div className="offer-marquee">
        <div className="offer-content">
          <span>Today's Special: Truffle Pasta • </span>
          <span>Happy Hour: 4-6PM • </span>
          <span>Weekend Brunch Menu Available • </span>
          <span>Private Dining Options • </span>
          <span>Wine Pairing Experience</span>
        </div>
      </div>
    </div>
  );
};

export default Header;