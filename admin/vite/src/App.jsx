import { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'

const App=()=> {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer/>
       <Navbar/>
       <hr />
       <div className="app-content">
         <Sidebar/>
         <Routes>
            <Route path="/add" element={<Add/>}/>
            <Route path="/list" element={<List/>}/>
            <Route path="/orderitems" element={<Order/>}/>
         </Routes>
       </div>
       
    </>
  )
}

export default App
