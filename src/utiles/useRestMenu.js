import { useEffect, useState } from "react";
import { FETCH_MENU_URL } from "./contants";
const useRestMenu=(resId)=>{


   
const [resInfo,setResInfo] = useState(null);


   
useEffect(()=>{
    fetchData();
},[])


const fetchData=async()=>{
    const data = await fetch(FETCH_MENU_URL+resId);
    const json= await data.json();
    setResInfo(json)
}
    return resInfo;


}


export default useRestMenu;
