import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../../store/action/index";
import classes from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";
import CartIcon from "../../UI/CartIcon/CartIcon";

const NavItems = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <ul className={classes.NavItems}>
      <NavItem link="/" exact>
        Home
      </NavItem>
      <NavItem link="/shop">Shop</NavItem>
      <NavItem link="/design">Design</NavItem>
      <NavItem link="/about">About</NavItem>
      <NavItem link="/cart">
        <CartIcon />
      </NavItem>
      {token ? (
        <li className={classes.LogoutContainer}>
          <button
            onClick={() => dispatch(actions.logout())}
            className={classes.LogoutButton}
          >
            Logout
          </button>
        </li>
      ) : (
        <NavItem link="/auth">Log In</NavItem>
      )}
    </ul>
  );
};

export default NavItems;
