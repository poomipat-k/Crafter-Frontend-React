import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "../../container/Auth/Auth";
import LoadingSpinner from "../../components/UI/LodingSpinner/LoadingSpinner";
import CheckoutItem from "./components/CheckoutItem";
import CheckoutFooter from "./components/CheckoutFooter";
import Address from "./components/Address";
import PaypalButton from "./components/PaypalButton";
import Alert from "../../components/UI/Alert/Alert";

import classes from "./Checkout.module.css";

const Checkout = () => {
  const { token } = useSelector((state) => state.auth);
  const { checkoutItems } = useSelector((state) => state.cart);
  const history = useHistory();
  const [showRedirectLoading, setShowRedirectLoading] = useState(false);
  const [paidFor, setPaidFor] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [captureId, setCaptureId] = useState("");

  let dataLenght = checkoutItems.length;
  useEffect(() => {
    if (dataLenght === 0) {
      setShowRedirectLoading(true);
      let timer = setTimeout(() => {
        setShowRedirectLoading(false);
        history.push("/cart");
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dataLenght, history]);

  let totalPrice = 0;
  let totalQuantity = 0;
  try {
    checkoutItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });
  } catch (err) {}

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
  } else if (token && checkoutItems.length === 0) {
    content = <h1 className={classes.Redirect}>Redirect to cart page...</h1>;
  } else if (token && checkoutItems.length > 0) {
    let items = checkoutItems.map((item) => {
      return (
        <CheckoutItem
          key={item.id}
          image={item.image}
          title={item.title}
          sex={item.variation.sex}
          size={item.variation.size}
          price={item.price}
          quantity={item.quantity}
        />
      );
    });

    content = (
      <React.Fragment>
        {!paidFor && <Address />}
        {items}
        <CheckoutFooter
          quantity={totalQuantity}
          totalPrice={totalPrice}
          buttonText="Place Order"
          success={paidFor}
        />

        <Alert
          style={{ padding: "16px" }}
          show={paidFor}
          message={`Payment received. ref id ${captureId}.`}
        />

        <PaypalButton
          items={checkoutItems}
          setPaidFor={setPaidFor}
          setPaymentProcessing={setPaymentProcessing}
          setCaptureId={setCaptureId}
        />

        {paymentProcessing && <LoadingSpinner asOverlay />}
      </React.Fragment>
    );
  }

  return (
    <div>
      <div className="center">
        {showRedirectLoading && <LoadingSpinner asOverlay />}
      </div>

      <div className={classes.Container}>{content}</div>
    </div>
  );
};

export default Checkout;
