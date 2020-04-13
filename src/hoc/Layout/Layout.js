import React, { useState } from "react";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };
  return (
    <React.Fragment>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />

      <SideDrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} />

      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
