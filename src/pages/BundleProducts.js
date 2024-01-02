import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { mycontext } from '../App'
import { useNavigate } from 'react-router-dom'

const BundleProducts = () => {
    const {setCart,bundleProducts,cart}=useContext(mycontext)
const navigate=useNavigate()
    const  addToCart=(bprt)=>{

  bprt.price=0;
const newCartWithBundle=[...cart]
newCartWithBundle.push(bprt)
setCart(newCartWithBundle)
navigate("/cart")
    }
  return (
    <Layout>
    <div className="hole-productsLists">

    <div className='hole-products ps-5 pt-3'>
      {bundleProducts.length>0?bundleProducts.map((product,i)=>(
        <div class="card" style={{width:"15rem"}}>
      <div class="card-body" key={i}>
        <p class="card-text">Productname :{product.productName}</p>
     <p class="card-text">Price :{product.price}</p>

     <div class="mt-auto mb-auto">
                <button onClick={()=>addToCart(product)} style={{ color: "white" }} className='btn button-color'>
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

export default BundleProducts