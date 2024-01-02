import axios from "axios" 
const url="https://pos-task-backend.onrender.com/"
export const registerData=async(email,password,userName)=>{
   
    const res=await axios.post(url+"users/create-user",{
        userName,password,email
    }
    )
return res
}

export const loginUserDetails=async(email,password)=>{
    const res=await axios.post(url+"users/login-user",{
        email,
        password
    })
    return res
}


export const getAllProducts=async()=>{
    const res=await axios.get(url+"products/get-allProducts")
return res
}

export const getAllOffers=async()=>{
    const res=await axios.get(url+"offers/all-offers")
    return res
}

export const ordersProducts=async(products,token,payment)=>{

        const res=await axios.post(url+"orders/orders-details",{
products,payment
    },{
        headers:{
                 token
        }
    })
    return res
}

export const allorders=async(token)=>{
    const res=await axios.get(url+"orders/get-all-orders",{
        headers:{
            token
        }
    })
return res
}

