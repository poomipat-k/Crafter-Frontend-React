import React from "react";

import ShopItem from "./ShopItem";
import Card from "../../../components/UI/Card/Card";

import classes from "./ShopPage.module.css";

const ShopPage = props => {
  let items = props.shopItems;
  let displayItems;

  if (items.length === 0) {
    displayItems = (
      <Card style={{padding: '16px'}}>
        <h1>Product not available.</h1>
      </Card>
    );
  } else {
    displayItems = items.map(item => {
      return (
        <ShopItem
          key={item.id}
          id={item.id}
          category={item.category}
          imageUrl={item.imageUrl}
          description={item.description}
          price={item.price}
          sold={item.sold}
        />
      );
    });
  }

  return <div className={classes.ItemsLayout}>{displayItems}</div>;
};

export default ShopPage;
