import React, { useContext } from 'react'
import { IMG_CDN_URL } from '../utiles/contants'
import ContextUser from '../utiles/ContextUser'

const RestaurantCard = (props) => {
  const {nameLoggin} = useContext(ContextUser)

    const {name,cloudinaryImageId,cuisines,costForTwo,deliveryTime,avgRating}= props.resData.info

    console.log(props)
  return (
    <div className=' w-[250px] rounded-xl bg-gray-100 hover:bg-blue-200 p-4 m-4'>
    <img  className="rounded-2xl" src={IMG_CDN_URL+cloudinaryImageId} />

 <h1>{name}</h1>
 <h3>{cuisines.join(",")}</h3>
 <h4>{costForTwo}</h4>
 <h4>{deliveryTime}</h4>
 <h3>{avgRating}</h3>
 
 <h6>{nameLoggin}</h6>
 
    </div>
  )
}

export const labelVeg = (RestaurantCard)=>{
  return(props)=>{
    return(
      <div>
      <label className="absolute bg-green-400 text-black m-2 p-2 rounded-lg">Veg</label>
      <RestaurantCard {...props}/>

      </div>
    )
  }
} 
export default RestaurantCard
