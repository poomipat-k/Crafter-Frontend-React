import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import SubNav from "../../components/Navigation/SubNav/SubNav";
import ShopPage from "./ShopPage/ShopPage";
import ShopPost from "./ShopPost/ShopPost";
import LoadingSpinner from "../../components/UI/LodingSpinner/LoadingSpinner";
import ErrorModal from "../../components/UI/Modal/ErrorModal";
import NewPost from "./NewPost/NewPost";
import { useHttpClient } from "../../shared/hooks/http-hook";

import classes from "./Shop.module.css";

const Shop = () => {
  const [loadedCategories, setLoadedCategories] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const fetchCategories = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/shop/categories`
      );
      setLoadedCategories(responseData.categories);
    } catch (err) {}
  }, [sendRequest]);

  useEffect(() => {
    fetchCategories();
  }, [sendRequest, fetchCategories]);

  let subNavLinks = null;
  if (loadedCategories) {
    if (loadedCategories.length !== 0) {
      subNavLinks = loadedCategories.map((cat) => {
        let link = `/shop/${cat.url}`;
        return (
          <SubNav key={cat.url} link={link}>
            {cat.name}
          </SubNav>
        );
      });
    }
  }

  let routes = null;
  if (loadedCategories) {
    let newPost = null;
    if (token && isAdmin) {
      newPost = (
        <Route key="/shop/newpost" path={`/shop/newpost`} exact>
          <NewPost fetchCategories={fetchCategories} />
        </Route>
      );
    }

    routes = (
      <Switch>
        {loadedCategories
          .map((cat) => {
            let link = `/shop/${cat.url}`;
            return (
              <Route key={link} path={link} exact>
                <ShopPage
                  fetchCategories={fetchCategories}
                  category={cat.url}
                />
              </Route>
            );
          })
          .concat(
            newPost,

            <Route key="/shop/post/:postId" path={`/shop/post/:postId`}>
              <ShopPost />
            </Route>,

            <Route key="/shop" path={`/shop`} exact>
              <ShopPage category="" />
            </Route>,

            <Redirect key="Redirect" to="/shop" />
          )}
      </Switch>
    );
  }

  return (
    <React.Fragment>
      <ul className={classes.Subnav}>
        {subNavLinks}
        {token && isAdmin && <SubNav link="/shop/newpost">ADD POST</SubNav>}
        {token && isAdmin && (
          <button
            onClick={fetchCategories}
            style={{
              outline: "none",
              backgroundColor: "#0341a3",
              borderRadius: "25px",
              padding: "5px",
              color: "white",
            }}
          >
            Refresh Links
          </button>
        )}
      </ul>

      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {routes}
    </React.Fragment>
  );
};

export default Shop;
