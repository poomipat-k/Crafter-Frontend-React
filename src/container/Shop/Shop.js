import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SubNav from "../../components/Navigation/SubNav/SubNav";
import ShopPage from "./ShopPage/ShopPage";
import ShopPost from "./ShopPost/ShopPost";
import LoadingSpinner from "../../components/UI/LodingSpinner/LoadingSpinner";
import ErrorModal from "../../components/UI/Modal/ErrorModal";
import NewPost from "./NewPost/NewPost";
import { useHttpClient } from "../../shared/hooks/http-hook";

import classes from "./Shop.module.css";

const Shop = props => {
  const [loadedCategories, setLoadedCategories] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { pathname } = props.location;
  console.log(loadedCategories)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/shop/categories`
        );
        setLoadedCategories(responseData.categories);
      } catch (err) {}
    };
    fetchCategories();
  }, [sendRequest]);

  const setCategoriesHandler = data => {
    setLoadedCategories(data);
  };

  let subNavLinks = null;
  if (loadedCategories.length !== 0) {
    subNavLinks = loadedCategories.map(cat => {
      let link = `/shop/${cat.url}`;
      return (
        <SubNav key={cat.url} link={link}>
          {cat.name}
        </SubNav>
      );
    });
  }

  let routes = null;

  if (loadedCategories !== 0) {
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

        <Route path={`/shop/newpost`} exact>
          <NewPost setCategories={setCategoriesHandler} />
        </Route>

        <Route path={`/shop/:postId`}>
          <ShopPost setCategories={setCategoriesHandler} />
        </Route>

        <Route path={`/shop`} exact>
          <ShopPage category="" />
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

      <ul className={classes.Subnav}>
        {subNavLinks}
        <SubNav link="/shop/newpost">ADD POST</SubNav>
      </ul>

      {routes}
    </React.Fragment>
  );
};

export default Shop;
