import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import * as actions from "./store/action/index";

import Layout from "./hoc/Layout/Layout";
import Landing from "./container/Landing/Landing";
import Design from "./container/Design/Design";
import About from "./container/About/About";
import Auth from "./container/Auth/Auth";
import Shop from "./container/Shop/Shop";
import Cart from "./container/Cart/Cart";

let logoutTimer;

const App = () => {
  const { token, tokenExpirationDate } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { login, logout } = actions;

  // Auto logout && logout
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => {
        dispatch(logout());
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate, dispatch]);

  // Auto login
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        login(
          storedData.userId,
          storedData.token,
          storedData.expiration,
          storedData.isAdmin
        )
      );
    }
  }, [login, dispatch]);

  let routes = (
    <Switch>
      <Route path="/shop" component={Shop} />
      <Route path="/design" exact component={Design} />
      <Route path="/about" exact component={About} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/" exact component={Landing} />
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default App;
