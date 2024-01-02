import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { allorders } from '../service/api'
import {  useNavigate } from 'react-router-dom'

const Bills = () => {
const navigate=useNavigate()
const [allOrders,setAllOrders]=useState([])
    useEffect(()=>{
const data=localStorage.getItem("token")
if(data){
    getAllorder(data)
}else{
    navigate("/login")
    
}

    },[])
    const getAllorder=async(token)=>{
        try {
        
            const res=await  allorders(token)
           setAllOrders(res.data.allorders)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
  <div className='hole-bills'>
    <div className='details-tables pt-2 ps-0 pb-2'>
{allOrders&&allOrders.map((bills,i)=>(
    <div>
    <div>
   <table class="table">
   <thead>
     <tr>
       <th scope="col">NO</th>
       <th scope="col">Buyer</th>
       <th scope="col">total Price</th>
       <th scope='col'>quantity</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <th scope="row">{i+1}</th>
       <td>{bills.buyer.userName}</td>
       <td>{bills.payment}</td>
       <td>{bills.products.length}</td>
     </tr>
   </tbody>
 </table>
</div>

<div >
    {bills.products.map((product,i)=>(
        <div className='single-product p-2'>.
        <div className='d-flex'><span><h6>Productname :</h6></span>{product.productName}</div>
        <div className='d-flex'><span><h6>ProductPrice :</h6></span>{product.price}</div>
        </div>
    ))}
</div>
</div>

))}
  </div>
  </div>
        </Layout>
  )
}

export default Bills