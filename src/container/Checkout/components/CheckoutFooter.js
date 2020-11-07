import React from "react";

import priceFormat from "../../../shared/utils/PriceFormat";
import LoadingSpinner from "../../../components/UI/LodingSpinner/LoadingSpinner";

import classes from "./CheckoutFooter.module.css";

const CheckoutFooter = (props) => {
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
    </div>
  );
};

export default CheckoutFooter;
