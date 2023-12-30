import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useRestMenu from "../utiles/useRestMenu";
import Shimmer from "./Shimmer";
import RestCategeory from "./RestCategeory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestMenu(resId);

  console.log(resInfo);

  const [showIndex, setIndexItems] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.data.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card;
  console.log(itemCards);
  
  const categories =
    resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(categories);

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="text-center">
      <h1 className="font-bold my-5 text-2xl">{name}</h1>
      <h2 className="font-bold text-lg ">
        {cuisines.join(",")} {costForTwoMessage}
      </h2>

      {categories.map((categories, index) => (
        <RestCategeory
          key={categories.card.card.title}
          data={categories.card.card}
          // showItem={index===0 ? true: false }
          showItems={index === showIndex ? true : false}
          setIndexItems={() => setIndexItems(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
