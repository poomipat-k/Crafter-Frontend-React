import React from "react";

import priceFormat from "../../../../shared/utils/PriceFormat";
import LoadingSpinner from "../../../../components/UI/LodingSpinner/LoadingSpinner";

import classes from "./CartFooter.module.css";

const CartFooter = (props) => {
  return (
    <div
      className={[
        classes.FooterContainer,
        props.success && classes.Success,
      ].join(" ")}
    >
      {props.isLoading && <LoadingSpinner asOverlay />}
      <div className={classes.Quantity}>Subtotal ({props.quantity} items):</div>
      <div className={[classes.TotalPrice].join(" ")}>
        ฿{priceFormat(props.totalPrice)}
      </div>
      <div className={[classes.ButtonContainer].join(" ")}>
        <button onClick={props.onClick} className={classes.CheckoutButton}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default CartFooter;
