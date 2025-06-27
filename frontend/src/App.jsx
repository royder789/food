import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import Footer from './components/Footer/Footer.jsx'
import Login from './components/Login/Login.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import Verify from './pages/Verify/Verify.jsx'

const App = () => {
  const[login,setLogin]=useState(false)

  return (
    <>
      {login?<Login setLogin={setLogin}/>:<></>}
      <div className='app'>
        {/* Navbar should be outside Routes to be displayed on all pages */}
        <Navbar setLogin={setLogin}/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/userorder' element={<MyOrders/>} />
          <Route path='/payment-success' element={Verify}/>
        </Routes>

      </div>
      <Footer />
    </>

  )
}

export default App
