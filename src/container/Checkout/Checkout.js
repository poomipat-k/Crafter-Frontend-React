import React from "react";

import Auth from "../../container/Auth/Auth";
import { useSelector } from "react-redux";

const Checkout = (props) => {
  const { token } = useSelector((state) => state.auth);

  let content;
  if (!token && !localStorage.getItem("userData")) {
    content = (
      <React.Fragment>
        <h1 className="center">Please log in to checkout items.</h1>
        <Auth />
      </React.Fragment>
    );
  } else if (!token && localStorage.getItem("userData")) {
    content = <h1 className="center">Loading...</h1>;
  } else if (token) {
    content = <h1>Protected Checkout page</h1>;
  }

  return <div>{content}</div>;
};

export default Checkout;
