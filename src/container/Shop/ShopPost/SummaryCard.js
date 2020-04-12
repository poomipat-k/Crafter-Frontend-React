import React, { useState, useEffect } from "react";

import SexButtons from "./SexButton";
import classes from "./SummaryCard.module.scss";

const SummaryCard = (props) => {
  const { postData } = props;
  const { stock } = props.postData;
  const [activeSex, setActiveSex] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [chosenQuantity, setChosenQuantity] = useState(1);

  useEffect(() => {
    for (let sex in stock) {
      if (sex === "total") {
        continue;
      }
      setActiveSex(sex);
      break;
    }
  }, [stock]);

  useEffect(() => {
    setActiveSize("");
    setChosenQuantity(1);
  }, [activeSex, stock]);

  useEffect(() => {
    try {
      if (chosenQuantity > stock[activeSex][activeSize].qty) {
        setChosenQuantity(stock[activeSex][activeSize].qty);
      }
    } catch (err) {}
  }, [activeSize, stock, setChosenQuantity, activeSex, chosenQuantity]);

  const sexButtonClickHandler = (sex) => {
    setActiveSex(sex);
  };

  const sizeButtonClickHandler = (size) => {
    setActiveSize(size);
  };

  const quantityIncrementHandler = () => {
    try {
      if (chosenQuantity === +stock[activeSex][activeSize].qty) {
        return;
      }
      setChosenQuantity((prevValue) => {
        return prevValue + 1;
      });
    } catch (err) {}
  };

  const quantityDecrementHandler = () => {
    try {
      if (chosenQuantity === 1) {
        return;
      }
      setChosenQuantity((prevValue) => {
        return prevValue - 1;
      });
    } catch (err) {}
  };

  const onQuantityChangeHandler = (event) => {
    let value = +event.target.value;
    if (value >= 1) {
      try {
        if (value > stock[activeSex][activeSize].qty) {
          setChosenQuantity(+stock[activeSex][activeSize].qty);
        } else {
          setChosenQuantity(value);
        }
      } catch (err) {}
    }
  };

  let checkMark = <span className={classes.checkMark}>&#10003;</span>;
  let sizeButton = [];
  if (stock) {
    for (let size in stock[activeSex]) {
      sizeButton.push(
        <button
          key={size}
          onClick={() => sizeButtonClickHandler(size)}
          value={size}
          disabled={!stock[activeSex][size].qty > 0}
          className={[
            classes.sizeButton,
            activeSize === size ? classes.activeSize : null,
            !stock[activeSex][size].qty > 0 ? classes.disabled : null,
          ].join(" ")}
        >
          {size.toUpperCase()}
          {activeSize === size && checkMark}
        </button>
      );
    }
  }

  let availableQuantity;
  let selectedItemPrice;
  try {
    availableQuantity = stock[activeSex][activeSize].qty;
    selectedItemPrice = stock[activeSex][activeSize].price;
  } catch (err) {}

  let displayPrice;
  if (selectedItemPrice) {
    displayPrice = `฿${selectedItemPrice}`;
  } else {
    let minPrice = 1000000;
    let maxPrice = 0;
    for (let size in stock[activeSex]) {
      let thisPrice = stock[activeSex][size].price;
      if (thisPrice > 0 && thisPrice < minPrice) {
        minPrice = thisPrice;
      }
      if (thisPrice > 0 && thisPrice > maxPrice) {
        maxPrice = thisPrice;
      }
    }
    displayPrice = `฿${minPrice}-฿${maxPrice}`;
    if (minPrice === maxPrice) {
      displayPrice = `฿${minPrice}`;
    }
  }

  return (
    <div className={classes.SummaryCard}>
      <div className={classes.font20}>{postData.title}</div>
      <div className={classes.soldContainer}>
        <span className={classes.font20}>{postData.sold}</span>{" "}
        <span className={classes.gray}>sold</span>
      </div>
      <div className={classes.price}>{displayPrice}</div>

      <div>
        <span className={classes.font20}>Gender: </span>
        <SexButtons
          activeSex={activeSex}
          stock={props.postData.stock}
          onClick={sexButtonClickHandler}
        />
      </div>

      <div className={classes.sizeButtonContainer}>{sizeButton}</div>

      <div className={classes.quantityContainer}>
        <span className={classes.font20}>Quantity: </span>
        <span style={{ marginLeft: "32px" }}>
          <button
            onClick={quantityDecrementHandler}
            className={[
              classes.minusButton,
              !(activeSex && activeSize) ? classes.disabled : null,
            ].join(" ")}
            disabled={!(activeSex && activeSize)}
          >
            -
          </button>
          <input
            className={[
              classes.quantityInput,
              !(activeSex && activeSize) ? classes.disabled : null,
            ].join(" ")}
            type="number"
            onChange={(event) => onQuantityChangeHandler(event)}
            value={chosenQuantity || 1}
            disabled={!(activeSex && activeSize)}
          />
          <button
            onClick={quantityIncrementHandler}
            className={[
              classes.plusButton,
              !(activeSex && activeSize) ? classes.disabled : null,
            ].join(" ")}
            disabled={!(activeSex && activeSize)}
          >
            +
          </button>
          {availableQuantity && (
            <div className={classes.availableQuantity}>
              {availableQuantity} piece available
            </div>
          )}
        </span>
      </div>

      <div>
        <button>Add To Cart</button>
        <button>Buy Now</button>
      </div>
    </div>
  );
};

export default SummaryCard;
