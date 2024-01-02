import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FormGroup,Label,Input,Form,Button} from "reactstrap"
import {  registerData } from '../service/api';
import Layout from '../components/Layout';


const Register=()=> {
const navigate=useNavigate();
const [emailDetails,setEmailDetails]=useState("");

const [password,setPassword]=useState("")
const [userName,setUserName]=useState('');
const [confirmPass,setConfirmPass]=useState("")


const validation=()=>{
if(userName.length<3||password.length<3){
    alert("userName or password should be more three charactors")
return false
}
if(password.length<3){
    alert("password should be more than 3 charactros")
    return false
}
if(password!==confirmPass){
    alert("password and confirmPasword doesn't match")
    return false
}
return true
}

  const submitted=async()=>{
    try {
        const isValid= validation()

if(isValid){
    
    const res= await registerData(emailDetails,password,userName);

if(res.data.result){
    alert(res.data.message)
navigate("/login")
}else{
    alert(res.data.message)
}
}

    } catch (error) {
        console.log(error)
    }



  }
  return (
   <Layout>
    <Form className='form-wrapper'>
      <div className='background-wrapper'>
      <h1 className='title'>Register Details</h1>
      <FormGroup floating>
    
    <Input
      id="exampleEmail"
      name="userName"
      placeholder="userName"
      type="text"
      onChange={(e)=>setUserName(e.target.value)}
      value={userName}
    />
    <Label for="exampleEmail">
    userName
    </Label>
  
  </FormGroup>
  
  {' '}
    <FormGroup floating>
    
      <Input
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
        onChange={(e)=>setEmailDetails(e.target.value)}
        value={emailDetails}
      />
      <Label for="exampleEmail" >
        Email
      </Label>
    
    </FormGroup>

    {' '}

    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
   onChange={(e)=>setPassword(e.target.value)}
      value={password}

      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>

    {' '}
    <FormGroup floating>
      <Input
        id="examplePassword1"
        name="password1"
        placeholder="Password1"
        type="password"
   onChange={(e)=>setConfirmPass(e.target.value)}
      value={confirmPass}

      />
      <Label for="examplePassword">
        Confirm Password
      </Label>
    </FormGroup>

    {' '}
    <Button  className='button-color' onClick={submitted}>
      Submit
    </Button>
  <Link to={"/login"}><Button className='ms-2 button-color '>
      Already have an account ? 
    </Button></Link>  
   
    </div>
  </Form>
  
   </Layout>
  )
}
export default Register;
