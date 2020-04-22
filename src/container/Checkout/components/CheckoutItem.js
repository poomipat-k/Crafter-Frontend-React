import React from "react";

import priceFormat from "../../../shared/utils/PriceFormat";
import classes from "./CheckoutItem.module.css";

const CartItemDesktop = (props) => {
  return (
    <div className={classes.CartItemContainer}>
      <div className={classes.flexItemProduct}>
        <div className={classes.flexItemProduct}>
          <div className={classes.ProductItem}>
            <img src={props.image} alt="Product"></img>
          </div>
          <div className={[classes.ProductItem, classes.Title].join(" ")}>
            {props.title}{" "}
            <span style={{ color: "darkblue", textTransform: "Capitalize" }}>
              {props.sex} {props.size}{" "}
            </span>
          </div>
        </div>
      </div>

      <div className={classes.flexItem}>฿{priceFormat(props.price)}/pcs</div>
      <div className={classes.flexItem}>{props.quantity} pcs.</div>
      <div className={classes.flexItem}>
        Total: ฿{priceFormat(Math.round(props.price * props.quantity))}
      </div>
    </div>
  );
};

export default CartItemDesktop;
