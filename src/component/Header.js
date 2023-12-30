import React, { useEffect, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import { LOGO_URL } from '../utiles/contants'
import useOnlineStatus from '../utiles/useOnlineStatus'
import ContextUser from '../utiles/ContextUser'
import {useSelector} from "react-redux";

function Header() {
    const [login,setLogin] = useState("Login")
    const onlineStatus = useOnlineStatus();

    const {nameLoggin}=useContext(ContextUser)

    useEffect(()=>{
        console.log("call")
       },[login])
   // we are subscribing to store using a hook
  const cartItems= useSelector((store)=>store.cart.items)
  return (
   
   
        <div className="flex justify-between bg-sky-300 shadow-xl">
            <div className='logo'>
                <img alt="data" className="w-20" src={LOGO_URL} />
            </div>
            <div className='navItems'>
                        <ul className='flex items-center p-2 m-4'>
                            <li className='px-4'>{nameLoggin}</li>
                            <li className='px-4 font-bold'>Online : {onlineStatus? "✅" : "❌"}</li>
                            <li className='px-4'><Link to='/'>Home</Link></li>
                            <li className='px-4'><Link to='/product'>Products</Link></li>
                            <li className='px-4'><Link to='/about'>About Us</Link></li>
                            <li className='px-4'><Link to='/contact'>Contact Us</Link></li>
                            <li className='px-4 font-bold'><Link to='/cart'>🛒- {cartItems.length} items</Link></li>
                            <button className='login'onClick={()=>{login==="Login"?setLogin("Login Out"):setLogin("Login");}}>{login}</button>
                            
                        </ul>

                        
                       
            </div>
        </div>
    )
}




export default Header
