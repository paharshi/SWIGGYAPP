import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListItems from './ListItems'
import { clearCart } from '../utiles/store/cartSlice'

const Cart = () => {

  const dispatch = useDispatch()
  const handleClearCart=()=>{
    dispatch(clearCart())
  }
    const cartItems= useSelector((store)=>store.cart.items)
    console.log(cartItems)
  return (
    <div className='text-center ali m-5 p-5'>
    <h1 className='text-2xl font-bold '>
        Cart
    </h1>
     <div className='w-6/12 m-auto'>
     <button className="bg-black rounded-lg m-2 p-2 text-white" onClick={handleClearCart} >Clear Cart </button>
        {cartItems.length===0 && <h1>Your cart is Empty. Add items to the cart</h1>}
        <ListItems items={cartItems}/>
    </div> 

    </div>
  )
}

export default Cart