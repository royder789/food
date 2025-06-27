import React, { useState, useEffect } from 'react';
import './ExplorerMenu.css';
import { menu_list } from '../../assets/assets';

const ExplorerMenu = ({ category, setCategory }) => {
  const [activeHover, setActiveHover] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (menuName) => {
    setCategory(prev => prev === menuName ? "All" : menuName);
    
    // Smooth scroll to ensure menu is visible
    const menuElement = document.getElementById('explore-menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div 
      className={`explore-menu ${scrollPosition > 100 ? 'scrolled' : ''}`} 
      id='explore-menu'
    >
      <div className="explore-menu-header">
        <h1 className="explore-menu-title">
          <span className="title-gradient">Explore Our Culinary Selection</span>
          <div className="title-decoration"></div>
        </h1>
        <p className="explore-menu-subtitle">
          Indulge in our diverse menu featuring an exquisite array of dishes crafted with premium ingredients
        </p>
      </div>
      
      <div className="explore-menu-list-container">
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name;
            return (
              <div 
                onClick={() => handleItemClick(item.menu_name)}
                onMouseEnter={() => setActiveHover(index)}
                onMouseLeave={() => setActiveHover(null)}
                key={index} 
                className={`explore-menu-list-item ${isActive ? "active" : ""}`}
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="menu-item-image-container">
                  <div className={`image-wrapper ${isActive ? 'active' : ''}`}>
                    <img 
                      src={item.menu_image} 
                      alt={item.menu_name} 
                      className="menu-item-image"
                      style={{
                        transform: activeHover === index ? 'scale(1.1)' : 'scale(1)',
                        filter: isActive ? 'none' : activeHover === index ? 'brightness(1.05)' : 'brightness(0.95)'
                      }}
                    />
                    <div className="image-overlay"></div>
                  </div>
                  
                  {isActive && (
                    <div className="active-indicator">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13L9 17L19 7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <p className="menu-item-name">
                  <span>{item.menu_name}</span>
                  {isActive && <span className="active-pulse"></span>}
                </p>
                <div className="menu-item-hover-effect"></div>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="explore-menu-divider">
        <div className="divider-line"></div>
        <div className="divider-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FF9800"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ExplorerMenu;