import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/action/index";
import HeaderPC from "./Component/Desktop/Header";
import CartItem from "./Component/Desktop/CartItem";
import ErrorModal from "../../components/UI/Modal/ErrorModal";
import CartFooter from "./Component/Desktop/CartFooter";
import Button from "../../components/FormElement/Button";
import Auth from "../Auth/Auth";
import Modal from "../../components/UI/Modal/Modal";

import classes from "./Cart.module.css";

const Cart = () => {
  const { innerWidth } = window;
  const [isDesktop, setIsDesktop] = useState(true);

  const { cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  const { error, sendRequest, clearError } = useHttpClient();

  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    onCancel: () => setShowModal(false),
    className: null,
    style: null,
    headerClass: null,
    header: null,
    contentClass: null,
    contentBody: null,
    footerClass: null,
    footer: (
      <div>
        <Button onClick={() => setShowModal(false)} btnType="Cool">
          Cancel
        </Button>
        <Button btnType="Danger">Yes</Button>
      </div>
    ),
  });

  const [masterChecked, setMasterChecked] = useState(true);
  const [checkboxState, setCheckboxState] = useState();

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    try {
      let updatedCheckbox = {};
      cart.forEach((cartItem) => {
        let id = cartItem.id;
        updatedCheckbox[id] = true;
      });
      setCheckboxState(updatedCheckbox);
    } catch (err) {}
  }, [cart]);

  useEffect(() => {
    if (innerWidth > 500) {
      setIsDesktop(true);
    } else if (innerWidth > 0 && innerWidth <= 500) {
      setIsDesktop(false);
    }
  }, [innerWidth]);

  const masterCheckboxHandler = (event) => {
    const masterChecked = event.target.checked;
    setMasterChecked(masterChecked);
    if (checkboxState) {
      const childCheckbox = { ...checkboxState };
      for (let key in childCheckbox) {
        childCheckbox[key] = masterChecked;
      }
      setCheckboxState(childCheckbox);
    }
  };

  const checkboxHandler = (event, id) => {
    let updatedState = { ...checkboxState };
    updatedState[id] = event.target.checked;
    setCheckboxState(updatedState);

    // Determine master checked status
    let masterChecked = true;
    for (let key in updatedState) {
      if (key === id) {
        masterChecked = masterChecked && event.target.checked;
        continue;
      }
      masterChecked = masterChecked && updatedState[key];
    }
    setMasterChecked(masterChecked);
  };

  const showModalHandler = (event, id) => {
    let modalType = event.target.textContent;
    switch (modalType) {
      case "Delete":
        setModalConfig({
          ...modalConfig,
          headerClass: classes.ModalHeader,
          header: "Delete",
          footer: (
            <div className="center">
              <Button onClick={() => setShowModal(false)} inverse>
                Cancel
              </Button>
              <Button onClick={() => deleteCartItemHandler(id)} danger>
                Yes
              </Button>
            </div>
          ),
          contentBody: "Are you sure to delete this item from cart?",
        });
        break;

      default:
        return;
    }
    setShowModal(true);
  };

  const deleteCartItemHandler = async (id) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/api/cart/${id}`;
    let header = { Authorization: `Bearer ${token}` };
    setShowModal(false);
    try {
      await sendRequest(url, "DELETE", null, header);
      const cartData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/`,
        "GET",
        null,
        header
      );
      dispatch(actions.setCartItems(cartData.cart, cartData.quantity));
    } catch (err) {}
  };

  const quantityChangeHandler = async (id, quantity) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/api/cart/${id}`;
    let header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      await sendRequest(
        url,
        "PATCH",
        JSON.stringify({ quantity: quantity }),
        header
      );
      dispatch(actions.updateCartItem(id, quantity));
    } catch (err) {}
  };

  const decrementHandler = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    const currentQuantity = cart[index].quantity;
    if (currentQuantity === 1) {
      return;
    }
    const quantity = currentQuantity - 1;
    quantityChangeHandler(id, quantity);
  };

  const incrementHandler = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    const currentQuantity = cart[index].quantity;
    const quantity = currentQuantity + 1;
    quantityChangeHandler(id, quantity);
  };

  const inputChangeHandler = (event, id) => {
    const index = cart.findIndex((item) => item.id === id);
    const currentQuantity = cart[index].quantity;

    let quantity = +event.target.value;
    if (typeof quantity !== "number") {
      return;
    }
    if (quantity % 1 !== 0) {
      quantity = Math.floor(quantity);
    }
    if (quantity < 1) {
      quantity = 1;
    }
    if (currentQuantity === quantity) {
      return;
    }
    quantityChangeHandler(id, quantity);
  };

  const checkoutHandler = () => {
    if (!checkboxState) {
      return;
    }
    setCheckoutLoading(true);
    let cartItems = [];
    for (let key in checkboxState) {
      if (checkboxState[key]) {
        cartItems.push(key);
      }
    }

    const checkoutRequest = async () => {
      try {
        let header = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/cart/checkout`,
          "POST",
          JSON.stringify({
            cartItemList: cartItems,
          }),
          header
        );
        return responseData;
      } catch (err) {}
    };
    checkoutRequest()
      .then((data) => {
        setCheckoutLoading(false);
        dispatch(actions.checkoutItems(data.items));
        history.push("/checkout");
      })
      .catch((err) => {
        setCheckoutLoading(false);
      });
  };

  let totalPrice = 0;
  let totalQuantity = 0;
  try {
    cart.forEach((item) => {
      if (checkboxState[item.id]) {
        totalPrice += item.quantity * item.price;
        totalQuantity += item.quantity;
      }
    });
  } catch (err) {}

  let desktop;

  if (!token) {
    desktop = (
      <React.Fragment>
        <h1 className="center">Please log in to view your cart.</h1>
        <Auth />
      </React.Fragment>
    );
  } else {
    desktop = (
      <React.Fragment>
        <h1 className="center">Shopping Cart Desktop</h1>
        <div className={classes.CartPageContainer}>
          <ErrorModal error={error} onClear={clearError} />

          <Modal
            show={showModal}
            onCancel={modalConfig.onCancel}
            className={modalConfig.className}
            style={modalConfig.style}
            headerClass={modalConfig.headerClass}
            header={modalConfig.header}
            contentClass={modalConfig.contentClass}
            footerClass={modalConfig.footerClass}
            footer={modalConfig.footer}
          >
            <p>{modalConfig.contentBody}</p>
          </Modal>

          {checkboxState && (
            <HeaderPC
              showCheckbox
              checked={masterChecked}
              checkboxHandler={(event) => masterCheckboxHandler(event)}
            />
          )}

          {cart.length > 0 && checkboxState ? (
            cart.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                image={cartItem.image}
                title={cartItem.title}
                postUrl={cartItem.postUrl}
                variation={cartItem.variation}
                price={cartItem.price}
                quantity={cartItem.quantity}
                id={cartItem.id}
                onDelete={(event) => showModalHandler(event, cartItem.id)}
                onDecrement={() => decrementHandler(cartItem.id)}
                onIncrement={() => incrementHandler(cartItem.id)}
                onChange={(event) => inputChangeHandler(event, cartItem.id)}
                checked={checkboxState[cartItem.id]}
                checkboxHandler={(event) => checkboxHandler(event, cartItem.id)}
              />
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>
              You do not have item in cart
            </h2>
          )}

          <CartFooter
            quantity={totalQuantity}
            totalPrice={totalPrice}
            onCheckout={checkoutHandler}
            isLoading={checkoutLoading}
            buttonText="Check Out"
          />
        </div>
      </React.Fragment>
    );
  }

  let mobile = (
    <React.Fragment>
      <h1>Shopping Cart Mobile</h1>
    </React.Fragment>
  );

  return <div>{isDesktop ? desktop : mobile}</div>;
};

export default Cart;
