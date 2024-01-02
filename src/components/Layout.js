import React, { Children } from 'react'
import Sidebar from './Sidebar'
import Allproducts from './Allproducts'
import Nav from './Nav'



const Layout = (props) => {
  return (
    <>
    <div >
<Nav/>
    </div>
    <div className='row'>
<div className='col-sm-3'><Sidebar/></div>
<div className='col-sm-9 p-0'>{props.children}</div>
    </div>
</>
  )
}

export default Layout