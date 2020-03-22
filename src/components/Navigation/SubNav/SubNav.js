import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./SubNav.module.css";

const SubNav = props => {
  return (
    <li className={classes.NavItem}>
      <NavLink
        className={
          props.location.pathname.includes(props.link) ? classes.active : null
        }
        to={props.link}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default SubNav;
