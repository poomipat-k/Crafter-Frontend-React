import React from "react";

import classes from "./QuantityController.module.css";

const QuantityController = (props) => {
  const { activeSex, activeSize, chosenQuantity } = props;

  return (
    <React.Fragment>
      <button
        onClick={props.onDecrement}
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
        onChange={(event) => props.onChange(event)}
        value={chosenQuantity || 1}
        disabled={!(activeSex && activeSize)}
      />
      <button
        onClick={props.onIncrement}
        className={[
          classes.plusButton,
          !(activeSex && activeSize) ? classes.disabled : null,
        ].join(" ")}
        disabled={!(activeSex && activeSize)}
      >
        +
      </button>
    </React.Fragment>
  );
};

export default QuantityController;
