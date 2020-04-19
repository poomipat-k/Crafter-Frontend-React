import React from "react";

import priceFormat from "../../../../shared/utils/PriceFormat";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import QuantityController from "../../../Shop/ShopPost/SummaryCardUI/QuantityController";
import classes from "./CartItem.module.css";

const CartItemDesktop = (props) => {
  return (
    <div className={classes.CartItemContainer}>
      {props.checked ? (
        <Checkbox
          checked={props.checked}
          onChange={props.checkboxHandler}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      ) : (
        <Checkbox
          checked={false}
          onChange={props.checkboxHandler}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      )}
      <div className={classes.flexItemProduct}>
        <Link to={props.postUrl}>
          <div className={classes.flexItemProduct}>
            <div className={classes.ProductItem}>
              <img src={props.image} alt="Product"></img>
            </div>
            <div className={[classes.ProductItem, classes.Title].join(" ")}>
              {props.title}
            </div>
          </div>
        </Link>
        <div
          className={[classes.ProductItem, classes.VariationContainer].join(
            " "
          )}
        >
          <div className={classes.Sex}>
            <div>Sex</div>
            <div>{props.variation.sex}</div>
          </div>
          <div className={classes.Size}>
            <div>Size</div>
            <div>{props.variation.size}</div>
          </div>
        </div>
      </div>

      <div className={classes.flexItem}>฿{priceFormat(props.price)}</div>
      <div className={classes.flexItem}>
        <QuantityController
          activeSex={props.variation.sex}
          activeSize={props.variation.size}
          chosenQuantity={props.quantity}
          onDecrement={props.onDecrement}
          onIncrement={props.onIncrement}
          onChange={props.onChange}
        />
      </div>
      <div className={classes.flexItem}>
        ฿{priceFormat(props.quantity * props.price)}
      </div>
      <div className={[classes.flexItem].join(" ")}>
        <span
          onClick={(event) => props.onDelete(event)}
          className={classes.deleteLink}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default CartItemDesktop;
