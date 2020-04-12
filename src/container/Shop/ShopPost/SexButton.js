import React from "react";

import classes from "./SexButton.module.css";

const SexButton = (props) => {
  let sexButtons = [];
  if (props.stock) {
    for (let sex in props.stock) {
      if (sex === "total") {
        continue;
      }
      sexButtons.push(
        <button
          key={sex}
          value={sex}
          className={props.activeSex === sex ? classes[sex] : null}
          onClick={() => props.onClick(sex)}
        >
          {sex.trim().charAt(0).toUpperCase() + sex.slice(1)}
        </button>
      );
    }
  }

  return sexButtons;
};

export default SexButton;
