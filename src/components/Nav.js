import React, { useContext, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'reactstrap';
import { mycontext } from '../App';


const Nav = () => {
 const {userName,setUserName} =useContext(mycontext)
 const navigate=useNavigate()
 const logout=()=>{
  setUserName("")
  localStorage.removeItem("token")
navigate("/login")
 }
  return (
<>
<div className='pt-2 mb-2 hole-nav d-flex justify-content-between'>
<div className='d-flex justify-content-between align-items-center' >  
    <div className='ps-3'><h5>shop</h5></div>
    <div className='d-flex gap-2' style={{backgroundColor:"white",marginLeft:"230px"}}>
<div  style={{width:"30vw",marginLeft:"50px"}}><Input style={{border:"none"}} color='black' placeholder='enter products'/></div>
<div className='cursor-pointer'><CiSearch size={18}/></div>
</div>
</div>
<div className='d-flex pe-2' >
   {!userName?
    <Link style={{color:"black"}} to={"/login"}><button className='btn '>Login</button></Link>
 :
 <div>
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  {userName}
  </button>
  <ul class="dropdown-menu">
    <li><a onClick={logout} class="dropdown-item" href="#">logout</a></li>
  </ul>
</div>
  
  </div>
  }
    <Link   style={{color:"black"}} to={"/register"}><button className='btn '>Register</button></Link>
</div>

</div>
</>
  )
}

export default Nav