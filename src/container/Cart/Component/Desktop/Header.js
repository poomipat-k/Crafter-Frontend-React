import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import classes from "./Header.module.css";

const HeaderPC = (props) => {
  return (
    <React.Fragment>
      <div className={classes.CartTableHeader}>
        <div className={[classes.flexHeaderProduct].join(" ")}>
          {props.showCheckbox && (
            <Checkbox
              checked={props.checked}
              onChange={props.checkboxHandler}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          )}
          Product
        </div>
        <div className={[classes.flexHeader].join(" ")}>Unit Price</div>
        <div className={[classes.flexHeader].join(" ")}>Quantity</div>
        <div className={[classes.flexHeader].join(" ")}>Total Price</div>
        <div className={[classes.flexHeader].join(" ")}>Actions</div>
      </div>
    </React.Fragment>
  );
};

export default HeaderPC;
