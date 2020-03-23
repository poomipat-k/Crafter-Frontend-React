import React, { useState, useEffect } from "react";

import ShopItem from "./ShopItem";
import LoadingSpinner from "../../../components/UI/LodingSpinner/LoadingSpinner";
import ErrorModal from "../../../components/UI/Modal/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import classes from "./ShopPage.module.css";

const ShopPage = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedItems, setLoadedItems] = useState([]);

  const { category } = props;
  useEffect(() => {
    const fetchItems = async category => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/shop/${category}`
        );
        setLoadedItems(responseData.shopItems);
      } catch (err) {}
    };
    fetchItems(category);
  }, [sendRequest, category]);

  let displayItems;
  if (!isLoading && loadedItems.length !== 0)
  displayItems = loadedItems.map(item => {
    return (
      <ShopItem
        key={item.id}
        id={item.id}
        category={item.categoryUrl}
        image={item.smImage}
        title={item.title}
        price={item.price}
        stock={item.stock}
        sold={item.sold}
      />
    );
  });

  return (
    <div className={classes.ItemsLayout}>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {displayItems}
    </div>
  );
};

export default ShopPage;
