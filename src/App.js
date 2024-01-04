
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';


import Allproducts from './components/Allproducts';
import Bills from './pages/Bills';
import Cart from './pages/Cart';

import { createContext, useState } from 'react';
import BundleProducts from './pages/BundleProducts';


export const mycontext=createContext()

function App() {

const [userName,setUserName]=useState('')
const [allProductfromStrore,setAllFromStroe]=useState([])
const [cart,setCart]=useState(JSON.parse(localStorage.getItem("cart")));
const [totalPrice,setTotalPrice]=useState(0)
const [bundleProducts,setBundleProducts]=useState([])

  return (
    <div className="App">
      <mycontext.Provider value={{userName,setUserName,cart,setCart,totalPrice,setTotalPrice,allProductfromStrore,setAllFromStroe,bundleProducts,setBundleProducts}}>
      <Routes>
      <Route path='/' element={<Allproducts/>} />
   <Route path='/login' element={<Login/>} />
   <Route path='/register' element={<Register/>} />
   <Route path='/bills' element={<Bills/>} />
   <Route path='/cart' element={<Cart/>} />
   <Route path='/bundle-products' element={<BundleProducts/>}/>
      </Routes>
      </mycontext.Provider>
    </div>
  );
}

export default App;
