import React from "react";

import { Link } from "react-router-dom";

import Card from "../../../components/UI/Card/Card";

import classes from "./ShopItem.module.css";

const ShopItem = props => {
  let path = `/shop/${props.category}/${props.description}-id.${props.id}`.replace(/\s/g, "-");
  // path = encodeURI(path)
  // console.log(path);

  return (
    <Link to={path}>
      <Card className={classes.ItemLayout}>
        <img src={props.imageUrl} alt={props.category} />
        <div className={classes.ItemDescription}>
          <p title={props.description}>{props.description}</p>
        </div>
        <div className={classes.ItemInfo}>
          <span className={classes.Price}>
            <p>{props.price} THB</p>
          </span>
          <span className={classes.Sold}>
            <p>{props.sold} sold</p>
          </span>
        </div>
      </Card>
    </Link>
  );
};

export default ShopItem;
