import { React, useContext, useState, useEffect } from 'react';
import { FiSearch, FiShoppingBag, FiUser, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { GiKnifeFork } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ setLogin }) => {
  const [menu, setMenu] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { cartTotal, token, setToken } = useContext(StoreContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenu(id === 'explore-menu' ? 'menu' : id === 'app-download' ? 'mobile-app' : 'contact-us');
    }
  };

  return (
    <>
      <style>{`
        :root {
          --primary: #FF4C4C;
          --secondary: #FF9800;
          --accent: #4CAF50;
          --cream: #FFF8E1;
          --dark: #333333;
          --light-gray: #777777;
          --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 5%;
          z-index: 1000;
          background: rgba(50, 50, 50, 0.9);
          backdrop-filter: blur(0px);
          transition: var(--transition);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Playfair Display', serif;
        }
        
        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          padding: 1rem 5%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* Luxury Logo */
        .logo-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          z-index: 10;
        }
        
        .logo-icon {
          font-size: 2rem;
          color: var(--secondary);
          transition: var(--transition);
        }
        
        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--cream);
          letter-spacing: 1px;
          transition: var(--transition);
        }
        
        .navbar.scrolled .logo-text {
          color: var(--cream);
        }
        
        .logo-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, var(--primary) 0%, rgba(255,76,76,0) 70%);
          opacity: 0;
          transition: var(--transition);
          z-index: -1;
          border-radius: 50%;
          left: -10%;
        }
        
        .logo-container:hover .logo-glow {
          opacity: 0.3;
        }
        
        .logo-container:hover .logo-icon {
          transform: rotate(15deg);
        }
        
        /* Navigation Menu */
        .navbar-menu {
          display: flex;
          list-style: none;
          gap: 2.5rem;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          position: relative;
          color: var(--cream);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 1px;
          padding: 0.5rem 0;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-transform: uppercase;
        }
        
        .navbar.scrolled .nav-link {
          color: var(--cream);
        }
        
        .nav-underline {
          height: 2px;
          background: var(--secondary);
          position: absolute;
          bottom: 0;
          left: 0;
        }
        
        .nav-link:hover {
          color: var(--secondary);
        }
        
        .nav-link.active {
          color: var(--secondary);
          font-weight: 600;
        }
        
        /* Right side elements */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .icon-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        /* Search Icon */
        .search-container {
          display: flex;
          align-items: center;
          position: relative;
        }
        
        .search-icon {
          font-size: 1.3rem;
          color: var(--cream);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .search-container:hover .search-icon {
          color: var(--secondary);
          transform: scale(1.1);
        }
        
        .search-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--secondary);
          color: var(--cream);
          padding: 0.3rem 0.5rem;
          margin-left: 0.5rem;
          outline: none;
          font-family: inherit;
        }
        
        .search-input::placeholder {
          color: rgba(255, 248, 225, 0.7);
        }
        
        /* Cart Icon */
        .cart-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .cart-icon-svg {
          font-size: 1.4rem;
          color: var(--cream);
          transition: var(--transition);
        }
        
        .cart-icon:hover .cart-icon-svg {
          color: var(--secondary);
          transform: translateY(-3px);
        }
        
        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--primary);
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
        }
        
        /* Sign In Button */
        .signin-btn {
          position: relative;
          background: transparent;
          color: var(--cream);
          border: 1px solid var(--secondary);
          padding: 0.7rem 1.8rem;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          overflow: hidden;
          transition: var(--transition);
          letter-spacing: 0.5px;
        }
        
        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent 0%, rgba(255,152,0,0.2) 100%);
          transform: skewX(-20deg);
          transition: all 0.8s ease;
        }
        
        .signin-btn:hover {
          background: rgba(255, 152, 0, 0.1);
          box-shadow: 0 0 15px rgba(255, 152, 0, 0.2);
        }
        
        .signin-btn:hover .btn-shine {
          left: 150%;
        }
        
        /* Profile Dropdown */
        .profile-wrapper {
          position: relative;
        }
        
        .profile-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 152, 0, 0.1);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .profile-icon {
          font-size: 1.2rem;
          color: var(--cream);
          transition: var(--transition);
        }
        
        .profile-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, var(--secondary) 0%, rgba(255,152,0,0) 70%);
          opacity: 0;
          transition: var(--transition);
          z-index: -1;
        }
        
        .profile-container:hover .profile-glow {
          opacity: 0.3;
        }
        
        .profile-container:hover .profile-icon {
          transform: scale(1.1);
        }
        
        .nav-profile-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 1rem);
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid rgba(255, 152, 0, 0.2);
          border-radius: 8px;
          padding: 0.8rem 0;
          min-width: 180px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          list-style: none;
          z-index: 100;
        }
        
        .nav-profile-dropdown li {
          padding: 0.7rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: var(--transition);
          color: var(--cream);
          font-size: 0.9rem;
        }
        
        .nav-profile-dropdown li:hover {
          background: rgba(255, 152, 0, 0.1);
          color: var(--secondary);
        }
        
        .dropdown-icon {
          font-size: 1rem;
        }
        
        .dropdown-arrow {
          margin-left: auto;
          font-size: 0.9rem;
          opacity: 0.7;
          transition: var(--transition);
        }
        
        .nav-profile-dropdown li:hover .dropdown-arrow {
          opacity: 1;
          transform: translateX(3px);
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .navbar-menu {
            gap: 1.5rem;
          }
          
          .navbar-right {
            gap: 1.2rem;
          }
        }
        
        @media (max-width: 768px) {
          .navbar {
            padding: 1rem 5%;
          }
          
          .logo-text {
            font-size: 1.2rem;
          }
          
          .navbar-menu {
            gap: 1rem;
          }
          
          .nav-link {
            font-size: 0.8rem;
          }
          
          .signin-btn {
            padding: 0.6rem 1.4rem;
            font-size: 0.8rem;
          }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Luxury Logo with Icon */}
          <Link to='/' className="logo-container" onClick={() => setMenu("home")}>
            <GiKnifeFork className="logo-icon" />
            <span className="logo-text">Tomato</span>
            <span className="logo-glow"></span>
          </Link>

          {/* Animated Navigation */}
          <ul className="navbar-menu">
            {[
              { id: 'home', label: 'Home' },
              { id: 'menu', label: 'Menu', target: 'explore-menu' },
              { id: 'mobile-app', label: 'App', target: 'app-download' },
              { id: 'contact-us', label: 'Contact', target: 'footer' }
            ].map((item) => (
              <li key={item.id}>
                {item.target ? (
                  <a 
                    href={`#${item.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.target);
                    }}
                    className={`nav-link ${menu === item.id ? "active" : ""}`}
                  >
                    {item.label}
                    <motion.span 
                      className="nav-underline"
                      initial={{ width: 0 }}
                      animate={{ width: menu === item.id ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                ) : (
                  <Link 
                    to='/' 
                    onClick={() => setMenu(item.id)}
                    className={`nav-link ${menu === item.id ? "active" : ""}`}
                  >
                    {item.label}
                    <motion.span 
                      className="nav-underline"
                      initial={{ width: 0 }}
                      animate={{ width: menu === item.id ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Premium Right Side Icons */}
          <div className="navbar-right">
            <div className="icon-group">
              <motion.div 
                className={`search-container ${searchOpen ? 'open' : ''}`}
                whileTap={{ scale: 0.95 }}
              >
                <FiSearch 
                  className="search-icon" 
                  onClick={() => setSearchOpen(!searchOpen)}
                />
                {searchOpen && (
                  <motion.input
                    initial={{ width: 0 }}
                    animate={{ width: 200 }}
                    exit={{ width: 0 }}
                    type="text"
                    placeholder="Search menu..."
                    className="search-input"
                  />
                )}
              </motion.div>

              <Link to='/cart' className="cart-icon">
                <FiShoppingBag className="cart-icon-svg" />
                {cartTotal() > 0 && (
                  <motion.span 
                    className="cart-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {cartTotal()}
                  </motion.span>
                )}
              </Link>
            </div>

            {!token ? (
              <motion.button 
                onClick={() => setLogin(true)} 
                className="signin-btn"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Sign In</span>
                <div className="btn-shine"></div>
              </motion.button>
            ) : (
              <div className="profile-wrapper">
                <motion.div 
                  className="profile-container"
                  onClick={() => setProfileOpen(!profileOpen)}
                  whileHover={{ scale: 1.05 }}
                >
                  <FiUser className="profile-icon" />
                  <div className="profile-glow"></div>
                </motion.div>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.ul 
                      className="nav-profile-dropdown"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <motion.li 
                        onClick={() => {
                          navigate('/userorder');
                          setProfileOpen(false);
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <FiShoppingBag className="dropdown-icon" />
                        <span>Orders</span>
                        <FiChevronRight className="dropdown-arrow" />
                      </motion.li>
                      <motion.li 
                        onClick={logOut}
                        whileHover={{ x: 5 }}
                      >
                        <FiLogOut className="dropdown-icon" />
                        <span>Log out</span>
                        <FiChevronRight className="dropdown-arrow" />
                      </motion.li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;