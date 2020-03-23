import React from "react";

import { Link } from "react-router-dom";

import Card from "../../../components/UI/Card/Card";

import classes from "./ShopItem.module.css";

const ShopItem = props => {
  let path = `/shop/${props.title}-id.${props.id}`.replace(
    /\s/g,
    "-"
  );
  path = encodeURI(path)
  // console.log(path);

  return (
    <Link to={path}>
      <Card className={classes.ItemLayout}>
        <img src={props.image} alt={props.category} />
        <div className={classes.ItemDescription}>
          <p title={props.title}>{props.title}</p>
        </div>
        <div className={classes.ItemInfo}>
          <span className={classes.Price}>
            <p>{props.price} THB</p>
          </span>
          <div className={classes.Sold}>
            <p>{props.stock} In stock</p>
            <p>{props.sold} sold</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ShopItem;
