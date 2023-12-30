import React, { useState, useEffect, useContext } from "react";
import {Link} from 'react-router-dom'
import RestaurantCard ,{labelVeg} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { labelVeg } from "./RestaurantCard";
import useOnlineStatus from "../utiles/useOnlineStatus";
import ContextUser from "../utiles/ContextUser";
// import RestaurantData from "../utiles/RestaurantData"

function Body() {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRest,setFilteredRest] = useState([]);
  const [searchText, setSearchText] = useState(""); 
  console.log(listOfRestaurant)
  const {inUser,setUserInfo} =useContext(ContextUser)

  const RestWithVeg = labelVeg(RestaurantCard)
  const apiUrl =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.385044&lng=78.486671&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setListOfRestaurant(
      data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants
    );
    setFilteredRest(
      data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants
    );
    console.log(data);
  };
const onlineStatus = useOnlineStatus();
if (onlineStatus===false) 
return(
  <div className="text-center">
    <h1 className="my-4 text-4xl font-bold  text-black-500">Please Check it Network! Your in Offline</h1>
  </div>
)
  return (listOfRestaurant?.length===0)? (<Shimmer/>) : (
    <div className="body">
      <div className="flex">
        <div className="m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="bg-blue-400 rounded-lg m-4 px-4 py-1"
            onClick={() => {
              const filteredRest = listOfRestaurant.filter((res) =>
                res.info.name.toUpperCase().includes(searchText.toUpperCase())
              );
            setFilteredRest(filteredRest);
              console.log(filteredRest);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="bg-blue-400 rounded-lg m-11 p-6 py-1"
          onClick={() => {
            let filterData = filteredRest.filter(
              (res) => res?.info?.avgRating >=4
            );
            console.log(filterData);
            setFilteredRest(filterData);
          }}
        >
          Top Rated
        </button>
        </div>

        <div className="flex m-4 p-4  items-center">
       <label>Username</label>
<input type="text" className="border p-2 border-black" value={inUser} onChange={(e)=>{setUserInfo(e.target.value)}}/>
</div>

        <div className="flex flex-wrap ">
        { filteredRest.map((res)=> (<Link to={"./restaurant/"+ res.info.id} >
           { res.info.veg ? (<RestWithVeg resData={res} /> ):( <RestaurantCard key={res?.info?.id} resData={res} />)}</Link>))}
          {/* {
          filteredRest.map((res) => ( <Link to = {"./restaurants/"+res?.info?.id}>
            <RestaurantCard key={res?.info?.id} resData={res} /></Link>
          ))} */}
        </div>
      </div>
    
  );
}
export default Body;
