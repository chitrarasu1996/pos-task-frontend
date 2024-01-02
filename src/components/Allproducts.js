import React, { useContext, useEffect, useState } from 'react'
import Layout from './Layout'
import { getAllProducts } from '../service/api'
import { mycontext } from '../App'

const Allproducts = () => {
const {setCart,cart,setAllFromStroe}=useContext(mycontext)
  useEffect(()=>{
    gettingAllProducts()
  },[])
  const [allProducts,setAllProducts]=useState([])
  const gettingAllProducts=async()=>{
    try {
      const  res=await getAllProducts()
      setAllFromStroe(res.data.allProducts)
 setAllProducts(res.data.allProducts)
 
    } catch (error) {
     
    }
   
  }
  const addProductsToCart=(Selectedproduct)=>{
const oldCart=[...cart]
const existingProduct=oldCart.findIndex((cartProduct)=>cartProduct._id===Selectedproduct._id)

if(existingProduct===-1){

  const quantity={...Selectedproduct,quantity:1}
oldCart.push(quantity)
setCart(oldCart)

}

  




  }

  return (
  <Layout >
    <div className="hole-productsLists">

<div className='hole-products ps-5 pt-3'>
  {allProducts.length>0?allProducts.map((product,i)=>(
    <div className="card"   key={i} style={{width:"15rem"}}>
  <div className="card-body" >
    <p className="card-text">Productname :{product.productName}</p>
 <p className="card-text">Price :{product.price}</p>
 <p className="card-text">Price :{product.price}</p>
 <div className="mt-auto mb-auto">
            <button onClick={()=>addProductsToCart(product)} style={{ color: "white" }} className='btn button-color'>
              Add to cart
            </button>
          </div>
  </div>
</div>
  ))
  :
  <div>
    there is no Products
    </div>
    }
</div>
    </div>
  </Layout>

  )
}

export default Allproducts