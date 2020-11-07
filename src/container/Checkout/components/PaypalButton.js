import React, { useEffect, useState, useRef } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/action/index";

const PaypalButton = (props) => {
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { setPaidFor, setPaymentProcessing, setCaptureId, items } = props;
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  let paypalRef = useRef();

  useEffect(() => {
    // Load PayPal Script
    const script = document.createElement("script");
    const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=THB`;
    script.addEventListener("load", () => setPaypalScriptLoaded(true));
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (paypalScriptLoaded) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return fetch(
              `${process.env.REACT_APP_BACKEND_URL}/api/payment/paypal/create`,
              {
                method: "POST",
                body: JSON.stringify({ checkoutItems: items }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then((res) => res.json())
              .then((data) => data.orderID);
          },
          onApprove: (data) => {
            setPaymentProcessing(true);
            return fetch(
              `${process.env.REACT_APP_BACKEND_URL}/api/payment/paypal/capture`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  orderID: data.orderID,
                  checkoutItems: items,
                }),
              }
            )
              .then((res) => res.json())
              .then((details) => {
                console.log("Details", details);
                if (details.statusCode === 201) {
                  setCaptureId(
                    details.result.purchase_units[0].payments.captures[0].id
                  );

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

                  fetchCartData().then((data) => {
                    dispatch(actions.setCartItems(data.cart, data.quantity));
                    setPaymentProcessing(false);
                  });
                  setPaidFor(true);
                }
              })
              .catch((err) => {
                console.log(err);
                setPaymentProcessing(false);
              });
          },
        })
        .render(paypalRef.current);

      // Clean up previous button
      return function cleanUp() {
        try {
          paypalRef.current.innerHTML = "";
        } catch (err) {
          console.log(err);
        }
      };
    }
  }, [
    paypalScriptLoaded,
    token,
    setPaidFor,
    dispatch,
    sendRequest,
    setPaymentProcessing,
    setCaptureId,
    items
  ]);

  return (
    <div ref={paypalRef} className="center" style={{ margin: "16px" }}></div>
  );
};

export default PaypalButton;
