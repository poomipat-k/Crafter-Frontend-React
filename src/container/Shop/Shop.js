import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SubNav from "../../components/Navigation/SubNav/SubNav";
import ShopPage from "./ShopPage/ShopPage";
import ShopPost from "./ShopPost/ShopPost";
import LoadingSpinner from "../../components/UI/LodingSpinner/LoadingSpinner";
import ErrorModal from "../../components/UI/Modal/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

import classes from "./Shop.module.css";

const Shop = props => {
  const [loadedCategories, setLoadedCategories] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/shop`
        );
        setLoadedCategories(responseData.categories);
      } catch (err) {}
    };
    fetchCategories();
  }, [sendRequest]);

  let subNavLinks = null;
  let routes = null;
  if (loadedCategories.length !== 0) {
    subNavLinks = loadedCategories.map(cat => {
      let link = `/shop/${cat.url}`;
      return (
        <SubNav key={cat.url} link={link} {...props}>
          {cat.name}
        </SubNav>
      );
    });

    routes = (
      <Switch>
        {loadedCategories.map(cat => {
          let link = `/shop/${cat.url}`;
          return (
            <Route key={link} path={link} exact>
              <ShopPage category={cat.url} />
            </Route>
          );
        })}
        <Route path={`/shop/:postId`}>
          <ShopPost />
        </Route>

        <Redirect to="/shop" />
      </Switch>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      <ul className={classes.Subnav}>{subNavLinks}</ul>
      {routes}
    </React.Fragment>
  );
};

export default Shop;
