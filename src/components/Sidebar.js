import React from 'react'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { IoBag } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
const Sidebar = () => {
  return (
    <div className='hole-sidebar ps-2'>
      <div>
        <ul className="">
           <Link  style={{ textDecoration: "none", color: "black" }} className='d-flex gap-2' to={"/"}><span><IoBag/></span><li>products</li></Link> 
           <Link to={"/cart"}style={{ textDecoration: "none", color: "black" }} className='d-flex gap-2 pt-3 pb-3'><span><CiShoppingCart/></span><li>cart</li></Link>
           <Link to={"/bills"} style={{ textDecoration: "none", color: "black" }} className='d-flex gap-2'><span><RiBillLine/></span><li>bills</li></Link> 
        </ul>
        </div>
        <div>

        </div>
    </div>
  )
}

export default Sidebar