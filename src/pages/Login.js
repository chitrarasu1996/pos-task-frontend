
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FormGroup, Label, Input, Form, Button } from "reactstrap"
import { loginUserDetails } from '../service/api';
import Layout from '../components/Layout';
import { mycontext } from '../App';

const Login = () => {
const {userName,setUserName}=useContext(mycontext)
const navigate=useNavigate()
    const [userDetails,setUserDetails]=useState({
        email:"",
        password:"",
    })
    const validationForm=()=>{
      
         if(userDetails.password.length<=3){
                    alert("password should be more than three characters")
                    return false
                }

                return true    
    }
    const submitted = async(e) => {
        e.preventDefault()
      const isvalidation= validationForm()
if(isvalidation){
    try {
        const response=await loginUserDetails(userDetails.email,userDetails.password)
  
        if(response.data.result&&response.data.token){
            setUserName(response.data.user.userName)
localStorage.setItem("token",response.data.token);
       alert(response.data.message)
       navigate("/")
     
}else{
    alert(response.data.message)
}
    } catch (error) {
        console.log(error)
    }

}
        

    }
  return (
    <Layout>
    <Form className='form-wrapper'>
        <div className='background-wrapper'>
            <h3 className='title text-center'>Login</h3>
            <FormGroup floating>

                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
                 value={userDetails.email}
                />
                <Label for="exampleEmail" >
                username
                </Label>

            </FormGroup>
            {' '}
            <FormGroup floating>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type="password"

                    onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                    value={userDetails.password}
                />
                <Label for="examplePassword">
                    Password
                </Label>
            </FormGroup>

            {' '}
           <div className='d-flex justify-content-between'>
            <Button className='btn button-color  btn-ouline' type="submit" onClick={submitted}>
                Submit
            </Button>
            <Link to={"/"}>
                <Button className="btn button-color  btn-outline " >
             new User?
            </Button>
            </Link>
            </div>
        </div>
    </Form>
</Layout>
  )
}

export default Login