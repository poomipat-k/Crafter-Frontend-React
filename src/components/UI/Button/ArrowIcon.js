import React from "react";

import classes from "./ArrowIcon.module.css";

const ArrowIcon = props => {
  let icon =
    props.type === "next" ? (
      <a
        href="/"
        className={[classes.Icon, classes.gray, classes.round].join(" ")}
        onClick={event => event.preventDefault()}
      >
        &#8250;
      </a>
    ) : (
      <a
        href="/"
        className={[classes.Icon, classes.gray, classes.round].join(" ")}
        onClick={event => event.preventDefault()}
      >
        &#8249;
      </a>
    );

  return icon;
};

export default ArrowIcon;
