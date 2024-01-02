import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { mycontext } from '../App'
import { getAllOffers, ordersProducts } from '../service/api'
import { useNavigate } from 'react-router-dom'



const Cart = () => {

    const navigate = useNavigate()

    const { cart, setCart, bundleProducts, setBundleProducts, totalPrice, setTotalPrice, allProductfromStrore } = useContext(mycontext)
    const [flatDiscountApplied, setFlastDiscountApplied] = useState(false)
    const [percentageOfferUsed, setPercentageOfferUsed] = useState(false)
    const [productsId, setProductsId] = useState([]);

    const [allOffers, setAllOffers] = useState([])
    const removeFromTheCart = (index) => {
        const filteredCart = [...cart].filter((product, i) => i !== index)
        setCart(filteredCart)
    }
    useEffect(() => {
        const products = [...cart]
        const total = products.reduce((acc, curr) => {
            return acc + curr.price
        }, 0)

        setTotalPrice(total)

    }, [cart])

    useEffect(() => {
        getOffers()
    }, [])

    const getOffers = async () => {
        try {
            const res = await getAllOffers()
            setAllOffers(res.data.allOffers)
        } catch (error) {
            console.log(error)
        }
    }

    const changePrice = (value, cartProduct, index) => {
        const allProduct = [...allProductfromStrore]
        const filterdPrice = allProduct.find((product) => {
            if (product._id === cartProduct._id) {
                return product
            }
        })
        const newCart = [...cart]
        if (value === "+") {

            const changeQuantityAndPrice = newCart.map((product, i) => {
                if (i === index) {
                    const { price, quantity } = product
                    return { ...product, price: price + filterdPrice.price, quantity: quantity + 1 }
                }
                return product
            })
            setCart(changeQuantityAndPrice)
        } else if (value === "-" && cartProduct.quantity > 1) {
            const changeQuantityAndPrice = newCart.map((product, i) => {
                if (i === index) {
                    const { price, quantity } = product
                    return { ...product, price: price - filterdPrice.price, quantity: quantity - 1 }
                }
                return product
            })
            setCart(changeQuantityAndPrice)
        }
    }
    const handleOfferSelection = (offer, product) => {

        const newCart = [...cart]
        if (offer.offerName === "Product Bundle") {
            setBundleProducts(offer.details.bundledProducts)
            navigate("/bundle-products")
        }

        if (offer.details.discountAmount) {

            const addDiscountAmt = newCart.map((cartProduct, i) => {
                if (cartProduct._id === product._id) {
                    const { price } = cartProduct
                    const newPrice = price - offer.details.discountAmount
                    return { ...cartProduct, price: newPrice }

                }
                return cartProduct
            })

            setCart(addDiscountAmt)

        } else if (offer.details.discountPercentage) {
            const addPercentage = cart.map((cartProduct, i) => {
                if (cartProduct._id === product._id) {
                    const { price } = cartProduct;
                    const discountPercentage = offer.details.discountPercentage;
                    const discountAmount = (price * discountPercentage) / 100;
                    const newPrice = price - discountAmount;

                    return { ...cartProduct, price: newPrice };
                }
                return cartProduct;
            })
            setCart(addPercentage)

        }

    }

    const paytheAmount = async () => {
        const token = localStorage.getItem("token")
        if (totalPrice > 0 &&token) {
           
            const productIdss = cart.map((product) => product._id);
            setProductsId(productIdss);
          
            console.log(productIdss,token)
            if (productIdss.length> 0) {

                const res = await ordersProducts(productIdss, token, totalPrice)
                if (res.data.result) {
                    setCart([])
                    navigate("/bills")
                    alert("payment has been paid")
                } else {
                    alert(res.data.message || "can't store the data right now")
                }

            }
        } else {
            console.log("works")
            alert("kindle add some product or login")
        }




    }


    return (
        <Layout>
            <div className='hole-cart'>
                <div className='row'>
                    <div className='col-md-6 col-sm-6' >
                        {cart.length > 0 ? cart.map((cartProduct, i) => (
                            <div key={i} className='single-cart-product mb-2 ps-2'>
                                <div>Productname :{cartProduct.productName}</div>
                                <div>price : {cartProduct.price}</div>

                                {cartProduct.price ? <div>Quantity :{cartProduct.quantity}</div> : "no price"}
                                <div className='d-flex gap-3 align-items-center'>
                                    {cartProduct.price ? <div><span><button onClick={() => changePrice("+", cartProduct, i)} className='btn btn-secondary '>+</button></span><button className='btn btn-secondary ms-2 me-2'>AddQuantity</button><span><button onClick={() => changePrice("-", cartProduct, i)} className='btn btn-secondary '>-</button></span></div> : ""}

                                    <div ><button onClick={() => removeFromTheCart(i)} className='btn btn-warning mt-2'>Remove</button></div>

                                </div>
                                {cartProduct.price !== 0 &&
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            offers
                                        </button>
                                        <ul className="dropdown-menu">
                                            {allOffers.length > 0 ? allOffers.map((offer) => (
                                                <li key={offer._id} onClick={() => handleOfferSelection(offer, cartProduct)} value={offer.details.discountAmount || offer.details.discountPercentage || offer.details.bundledProducts}>
                                                    <a className="dropdown-item" href="#">
                                                        {((offer.details.discountAmount && "flat discount" + offer.details.discountAmount) || (offer.details.bundledProducts.length > 0 && " one more product discount") || offer.details.discountPercentage && "flat" + offer.details.discountPercentage + "%" + "discount")}
                                                    </a>
                                                </li>
                                            )) : <div>
                                                No offers
                                            </div>
                                            }
                                        </ul>
                                    </div>
                                }
                            </div>

                        ))
                            :
                            <div>
                                <h2 className='text-center'>cart is empty</h2>
                            </div>
                        }
                    </div>
                    <div className='col-md-5 col-sm-5 total-price' >
                        <div className=''>
                            <h4 className='text-center pt-2'>cart Summary</h4>
                            <hr />
                            <div className='d-flex flex-column justify-content-center'>

                                <div style={{ paddingTop: "100px" }}><h3>Total Price :{(totalPrice > 0 && totalPrice) || 0}</h3></div>
                            </div>
                            <div onClick={paytheAmount} style={{ width: "100%", marginTop: "50px" }} className='btn btn-warning'>payment</div>

                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default Cart