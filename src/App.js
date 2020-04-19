import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import * as actions from "./store/action/index";

import { useHttpClient } from "./shared/hooks/http-hook";
import Layout from "./hoc/Layout/Layout";
import Landing from "./container/Landing/Landing";
import Design from "./container/Design/Design";
import About from "./container/About/About";
import Auth from "./container/Auth/Auth";
import Shop from "./container/Shop/Shop";
import Cart from "./container/Cart/Cart";
import Checkout from "./container/Checkout/Checkout";

let logoutTimer;

const App = () => {
  const { token, tokenExpirationDate } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { login, logout, setCartItems } = actions;
  const { sendRequest } = useHttpClient();

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

  // Fetch cart data if logged in
  useEffect(() => {
    const fetchCartData = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      return response;
    };

    if (token) {
      fetchCartData().then((data) => {
        dispatch(setCartItems(data.cart, data.quantity));
      });
    } else {
      dispatch(setCartItems([], 0));
    }
  }, [token, dispatch, setCartItems, sendRequest]);

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
      <Route path="/checkout" exact>
        <Checkout />
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
