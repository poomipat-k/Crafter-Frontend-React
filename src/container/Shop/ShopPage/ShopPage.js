import React, { useState, useEffect, useCallback } from "react";

import ShopItem from "./ShopItem";
import LoadingSpinner from "../../../components/UI/LodingSpinner/LoadingSpinner";
import ErrorModal from "../../../components/UI/Modal/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import classes from "./ShopPage.module.css";

const ShopPage = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedItems, setLoadedItems] = useState([]);

  const { category } = props;

  const fetchItems = useCallback(
    async (category) => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/shop/${category}`
        );
        setLoadedItems(responseData.shopItems);
      } catch (err) {}
    },
    [sendRequest]
  );

  useEffect(() => {
    fetchItems(category);
  }, [sendRequest, category, fetchItems]);

  let displayItems;
  if (!isLoading && loadedItems.length !== 0)
    displayItems = loadedItems.map((item) => {
      let total = 0;
      for (let sex in item.stock) {
        for (let size in item.stock[sex]) {
          total += item.stock[sex][size].qty;
        }
      }

      return (
        <ShopItem
          key={item.id}
          id={item.id}
          category={item.categoryUrl}
          image={item.Images[0]}
          title={item.title}
          price={item.price}
          stock={total}
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
