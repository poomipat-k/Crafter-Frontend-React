import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../../components/UI/LodingSpinner/LoadingSpinner";
import ErrorModal from "../../../../components/UI/Modal/ErrorModal";
import Auth from "../../../Auth/Auth";
import Modal from "../../../../components/UI/Modal/Modal";
import Alert from "../../../../components/UI/Alert/Alert";
import classes from "./Add2CartButton.module.css";
import * as actions from "../../../../store/action/index";

const MUST_LOGIN_ERROR_TEXT = "Must login to proceed!";

const Add2CartButton = (props) => {
  const { sex, size, quantity, itemId } = props;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { token } = useSelector((state) => state.auth);
  const [showLogin, setShowLogin] = useState(false);
  const history = useHistory();
  let isDisabled = !(sex && size && quantity > 0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showSuccessAlert) {
      let animationTimer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 1500);
      return () => {
        clearTimeout(animationTimer);
      };
    }
  }, [showSuccessAlert]);

  // Fetch cart data
  const fetchCartData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/cart`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data;
  };

  const add2Cart = async () => {
    const add2cartAPIRequest = async (variation, qty, id) => {
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/cart/add2cart`,
          "POST",
          JSON.stringify({
            variation: variation,
            quantity: qty,
            itemId: id,
          }),
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        );
      } catch (err) {}
    };
    let responseData;
    let itemVariation = { sex: sex, size: size };
    await add2cartAPIRequest(itemVariation, quantity, itemId);
    return responseData;
  };

  const buyNowHandler = async () => {
    let res = await add2Cart();
    if (res) {
      fetchCartData()
        .then((data) => {
          dispatch(actions.setCartItems(data.cart, data.quantity));
          history.push("/cart");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowLogin(true);
    }
  };

  const add2cartHandler = async () => {
    let res = await add2Cart();
    if (res) {
      fetchCartData()
        .then((data) => {
          dispatch(actions.setCartItems(data.cart, data.quantity));
          setShowSuccessAlert(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowLogin(true);
    }
  };

  const closeAuthHandler = () => {
    setShowLogin(false);
  };

  let modal;
  if (error && error === MUST_LOGIN_ERROR_TEXT) {
    modal = (
      <Modal
        show={showLogin}
        header={error}
        onCancel={closeAuthHandler}
        childrenComponent={<Auth />}
      />
    );
  } else if (error) {
    modal = <ErrorModal error={error} onClear={clearError} />;
  }
  return (
    <React.Fragment>
      <div>
        <button
          disabled={isDisabled}
          className={[isDisabled ? classes.disabled : null].join(" ")}
          onClick={add2cartHandler}
        >
          Add To Cart
        </button>
        <button
          disabled={isDisabled}
          className={[isDisabled ? classes.disabled : null].join(" ")}
          onClick={buyNowHandler}
        >
          Buy Now
        </button>
      </div>
      <Alert
        show={showSuccessAlert}
        message="Add item to Cart!!!"
        alertClass={classes.alert}
      />

      {modal}
      {isLoading && <LoadingSpinner />}
    </React.Fragment>
  );
};

export default Add2CartButton;
