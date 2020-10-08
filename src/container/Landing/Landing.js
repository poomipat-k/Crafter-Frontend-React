import React from "react";
import classes from "./Landing.module.css";

const Landing = (props) => {
  return (
    <div>
        <h1 className={classes.block}>
          Welcome to cloth online-shopping dev by Poomipat Khamai
        </h1>
      <div className={classes.childBlock}>
        <h3>1. Navigate to Shop tab to see the online shop</h3>
        <h3>2. Navagate to Design tab to see a Custom design Polo feature</h3>
        <h3>
          3. Navigate Cart Icon to check the current item in your cart(required
          login)
        </h3>
      </div>
    </div>
  );
};

export default Landing;
