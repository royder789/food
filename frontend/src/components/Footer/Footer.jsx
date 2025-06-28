import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const testimonials = [
    { text: "Tomato Eats transformed my dining experience—exquisite flavors every time!", author: "Aarav S." },
    { text: "The delivery was lightning-fast, and the food was restaurant-quality!", author: "Priya K." },
    { text: "Best gourmet service I've ever used—highly recommend!", author: "Rahul M." },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      setSubscribeMessage('Thank you for subscribing! Check your inbox.');
      setEmail('');
    } else {
      setSubscribeMessage('Please enter a valid email address.');
    }
  };

  return (
    <footer className="footer" id="footer" style={{
      background: 'linear-gradient(135deg, #0a0a1a, #1a2d3d)',
      color: '#e0e6f0',
      padding: isMobile ? '40px 20px' : '60px 80px',
      fontFamily: '"Poppins", "Helvetica Neue", Arial, sans-serif',
      boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.5)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      {/* Glassmorphism Background Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        zIndex: 0,
      }} />

      <div className="footer-content" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr 1fr',
        gap: isMobile ? '40px' : '50px',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Brand Section */}
        <div className="footer-brand" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={assets.logo} alt="Tomato Eats" style={{ width: '40px', height: '40px' }} />
            <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', margin: 0 }}>Tomato Eats</h2>
          </div>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#d0d8e0',
            maxWidth: '280px',
            fontWeight: '300',
          }}>
            Tomato Eats redefines gourmet dining with world-class cuisine delivered to your door.
          </p>
          <div className="socials" style={{
            display: 'flex',
            gap: '15px',
          }}>
            {['facebook_icon', 'twitter_icon', 'linkedin_icon', 'instagram_icon'].map((icon) => (
              <a key={icon} href="https://www.linkedin.com/in/mihir-kumar-roy-169155263" target="_blank" rel="noopener noreferrer">
                <img 
                  src={assets[icon] || assets.linkedin_icon} 
                  alt={icon.split('_')[0]} 
                  style={{ 
                    width: '28px', 
                    height: '28px', 
                    transition: 'transform 0.3s ease',
                    filter: 'brightness(0) invert(1)'
                  }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} 
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} 
                />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-nav" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '15px',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>EXPLORE</h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {['Home', 'About Us', 'Menu', 'Delivery'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`} style={{
                  color: '#d0d8e0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  padding: '5px 0',
                  display: 'block',
                  fontSize: '14px',
                }} onMouseOver={e => e.currentTarget.style.color = '#ff6347'} onMouseOut={e => e.currentTarget.style.color = '#d0d8e0'}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact and Support */}
        <div className="footer-contact" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '15px',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>SUPPORT</h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span role="img" aria-label="phone" style={{ fontSize: '16px' }}>📞</span>
              <a href="tel:+918980943569" style={{ 
                color: '#d0d8e0', 
                textDecoration: 'none',
                fontSize: '14px'
              }}>+91 8980 943 569</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span role="img" aria-label="email" style={{ fontSize: '16px' }}>📧</span>
              <a href="mailto:support@tomatoeats.com" style={{ 
                color: '#d0d8e0', 
                textDecoration: 'none',
                fontSize: '14px'
              }}>support@tomatoeats.com</a>
            </li>
          </ul>
          <div style={{
            background: 'rgba(255, 99, 71, 0.2)',
            padding: '8px 12px',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '12px',
            color: '#ff6347',
            fontWeight: '500',
          }}>
            24/7 Premium Support
          </div>
          <a href="https://dashboard.tawk.to/#/wizard" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block',
            padding: '10px 15px',
            background: '#ff4500',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'all 0.3s ease',
            marginTop: '10px',
            fontSize: '14px',
            textAlign: 'center'
          }} onMouseOver={e => e.currentTarget.style.background = '#ff6347'} onMouseOut={e => e.currentTarget.style.background = '#ff4500'}>
            Live Chat Now
          </a>
        </div>

        {/* Testimonials and Newsletter */}
        <div className="footer-premium" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '15px',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>INSIGHTS</h2>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '15px',
            borderRadius: '10px',
            height: isMobile ? 'auto' : '120px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.5',
              color: '#d0d8e0',
              margin: 0,
            }}>
              "{testimonials[currentTestimonial].text}" – {testimonials[currentTestimonial].author}
            </p>
          </div>
          <form onSubmit={handleSubscribe} style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '10px',
            alignItems: 'center',
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Stay updated with us"
              style={{
                padding: '12px 15px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '25px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                outline: 'none',
                flex: '1',
                fontSize: '14px',
                width: isMobile ? '100%' : 'auto',
              }}
            />
            <button type="submit" style={{
              padding: '12px 25px',
              background: 'linear-gradient(45deg, #ff4500, #ff6347)',
              border: 'none',
              borderRadius: '25px',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '500',
              width: isMobile ? '100%' : 'auto',
            }} onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(45deg, #ff6347, #ff4500)'} onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(45deg, #ff4500, #ff6347)'}>
              Subscribe
            </button>
          </form>
          {subscribeMessage && (
            <p style={{ 
              fontSize: '12px', 
              color: subscribeMessage.includes('Thank') ? '#90ee90' : '#ff4500', 
              marginTop: '5px',
              textAlign: 'center'
            }}>
              {subscribeMessage}
            </p>
          )}
        </div>
      </div>

      {/* Global Presence Map (SVG Placeholder) - Hidden on mobile */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '100px',
          background: 'url(https://www.svgrepo.com/show/508473/world-map.svg) no-repeat center',
          backgroundSize: 'contain',
          opacity: '0.3',
          filter: 'blur(2px)',
          zIndex: 0,
        }} />
      )}

      <hr style={{ 
        borderColor: 'rgba(255, 255, 255, 0.1)', 
        margin: isMobile ? '20px 0' : '30px 0' 
      }} />
      
      <div style={{
        textAlign: 'center',
        fontSize: '12px',
        color: '#b0c0d0',
        padding: '15px 0',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '5px' : '15px',
      }}>
        <span>© {currentYear} Tomato Eats - All Rights Reserved</span>
        <span style={{ display: isMobile ? 'none' : 'inline' }}>|</span>
        <a href="#terms" style={{ 
          color: '#b0c0d0', 
          textDecoration: 'none', 
          transition: 'color 0.3s ease',
          fontSize: isMobile ? '11px' : '12px'
        }} onMouseOver={e => e.currentTarget.style.color = '#ff6347'} onMouseOut={e => e.currentTarget.style.color = '#b0c0d0'}>
          Terms of Service
        </a>
        <span style={{ display: isMobile ? 'none' : 'inline' }}>|</span>
        <a href="#privacy" style={{ 
          color: '#b0c0d0', 
          textDecoration: 'none', 
          transition: 'color 0.3s ease',
          fontSize: isMobile ? '11px' : '12px'
        }} onMouseOver={e => e.currentTarget.style.color = '#ff6347'} onMouseOut={e => e.currentTarget.style.color = '#b0c0d0'}>
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;