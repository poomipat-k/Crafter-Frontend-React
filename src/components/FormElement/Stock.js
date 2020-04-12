import React, { useState, useEffect } from "react";

import classes from "./Stock.module.css";

const StockForm = (props) => {
  const { onInputChange, stockFormState } = props;
  const [activeSex, setActiveSex] = useState("unisex");
  const [validateForm, setValidateForm] = useState({
    unisex: {
      xs: { isValid: true },
      s: { isValid: true },
      m: { isValid: true },
      l: { isValid: true },
      xl: { isValid: true },
      "2xl": { isValid: true },
      "3xl": { isValid: true },
      "4xl": { isValid: true },
      "5xl": { isValid: true },
      "6xl": { isValid: true },
    },
    male: {
      xs: { isValid: true },
      s: { isValid: true },
      m: { isValid: true },
      l: { isValid: true },
      xl: { isValid: true },
      "2xl": { isValid: true },
      "3xl": { isValid: true },
      "4xl": { isValid: true },
      "5xl": { isValid: true },
      "6xl": { isValid: true },
    },
    female: {
      xs: { isValid: true },
      s: { isValid: true },
      m: { isValid: true },
      l: { isValid: true },
      xl: { isValid: true },
      "2xl": { isValid: true },
      "3xl": { isValid: true },
      "4xl": { isValid: true },
      "5xl": { isValid: true },
      "6xl": { isValid: true },
    },
  });

  useEffect(() => {
    let formIsValid = true;
    for (let sex in validateForm) {
      for (let size in validateForm[sex]) {
        formIsValid = formIsValid && validateForm[sex][size].isValid;
      }
    }
    props.setStockFormIsValid(formIsValid);
  });

  const buttonClickedHandler = (event) => {
    event.preventDefault();
    setActiveSex(event.target.value.toLowerCase());
  };

  const inputChangeHandler = (event) => {
    let updatedState = {
      ...stockFormState,
      [activeSex]: { ...stockFormState[activeSex] },
    };
    const [size, field] = event.target.id.split("_");
    updatedState[activeSex][size][field] = +event.target.value;
    onInputChange(updatedState);

    let isValid =
      (+updatedState[activeSex][size].qty > 0 &&
        +updatedState[activeSex][size].price > 0) ||
      (+updatedState[activeSex][size].qty === 0 &&
        +updatedState[activeSex][size].price === 0);

    let updatedValidatedForm = {
      ...validateForm,
      [activeSex]: { ...validateForm[activeSex] },
    };
    updatedValidatedForm[activeSex][size] = { isValid: isValid };

    setValidateForm(updatedValidatedForm);
  };

  const clearFormHandler = (event) => {
    event.preventDefault();
    onInputChange({
      unisex: {
        xs: { qty: "", price: "" },
        s: { qty: "", price: "" },
        m: { qty: "", price: "" },
        l: { qty: "", price: "" },
        xl: { qty: "", price: "" },
        "2xl": { qty: "", price: "" },
        "3xl": { qty: "", price: "" },
        "4xl": { qty: "", price: "" },
        "5xl": { qty: "", price: "" },
        "6xl": { qty: "", price: "" },
      },
      male: {
        xs: { qty: "", price: "" },
        s: { qty: "", price: "" },
        m: { qty: "", price: "" },
        l: { qty: "", price: "" },
        xl: { qty: "", price: "" },
        "2xl": { qty: "", price: "" },
        "3xl": { qty: "", price: "" },
        "4xl": { qty: "", price: "" },
        "5xl": { qty: "", price: "" },
        "6xl": { qty: "", price: "" },
      },
      female: {
        xs: { qty: "", price: "" },
        s: { qty: "", price: "" },
        m: { qty: "", price: "" },
        l: { qty: "", price: "" },
        xl: { qty: "", price: "" },
        "2xl": { qty: "", price: "" },
        "3xl": { qty: "", price: "" },
        "4xl": { qty: "", price: "" },
        "5xl": { qty: "", price: "" },
        "6xl": { qty: "", price: "" },
      },
    });

    setValidateForm({
      unisex: {
        xs: { isValid: true },
        s: { isValid: true },
        m: { isValid: true },
        l: { isValid: true },
        xl: { isValid: true },
        "2xl": { isValid: true },
        "3xl": { isValid: true },
        "4xl": { isValid: true },
        "5xl": { isValid: true },
        "6xl": { isValid: true },
      },
      male: {
        xs: { isValid: true },
        s: { isValid: true },
        m: { isValid: true },
        l: { isValid: true },
        xl: { isValid: true },
        "2xl": { isValid: true },
        "3xl": { isValid: true },
        "4xl": { isValid: true },
        "5xl": { isValid: true },
        "6xl": { isValid: true },
      },
      female: {
        xs: { isValid: true },
        s: { isValid: true },
        m: { isValid: true },
        l: { isValid: true },
        xl: { isValid: true },
        "2xl": { isValid: true },
        "3xl": { isValid: true },
        "4xl": { isValid: true },
        "5xl": { isValid: true },
        "6xl": { isValid: true },
      },
    });
  };

  let buttons = (
    <div>
      <button
        onClick={buttonClickedHandler}
        className={activeSex === "unisex" ? classes[activeSex] : null}
        value="unisex"
      >
        Unisex
      </button>
      <button
        onClick={buttonClickedHandler}
        className={activeSex === "male" ? classes[activeSex] : null}
        value="male"
      >
        Male
      </button>
      <button
        onClick={buttonClickedHandler}
        className={activeSex === "female" ? classes[activeSex] : null}
        value="female"
      >
        Female
      </button>
      <button style={{ marginLeft: "60px" }} onClick={clearFormHandler}>
        Reset
      </button>
    </div>
  );

  let formDisplay = [];
  for (let size in stockFormState[activeSex]) {
    formDisplay.push(
      <div className={classes.Item} key={size}>
        <label htmlFor={size}>{size.toUpperCase()}: </label>
        <input
          id={`${size}_qty`}
          type="number"
          placeholder={`${size.toUpperCase()} stock`}
          className={[
            classes.Number,
            !validateForm[activeSex][size].isValid ? classes.Invalid : null,
          ].join(" ")}
          onChange={(event) => inputChangeHandler(event)}
          value={stockFormState[activeSex][size].qty}
        />
        <label htmlFor="price">price: </label>
        <input
          id={`${size}_price`}
          type="number"
          placeholder="Price"
          className={[
            classes.Number,
            !validateForm[activeSex][size].isValid ? classes.Invalid : null,
          ].join(" ")}
          onChange={(event) => inputChangeHandler(event)}
          value={stockFormState[activeSex][size].price}
        />
      </div>
    );
  }
  let BackgroudColorClass;
  switch (activeSex) {
    case "unisex":
      BackgroudColorClass = classes.BlackBackground;
      break;
    case "male":
      BackgroudColorClass = classes.BlueBackground;
      break;
    case "female":
      BackgroudColorClass = classes.RedBackground;
      break;
    default:
      BackgroudColorClass = classes.BlackBackground;
  }

  return (
    <div>
      <label className={classes.Label}>Stock & Price</label>
      {buttons}
      <div
        className={[classes.StockFormContainer, BackgroudColorClass].join(" ")}
      >
        {formDisplay}
      </div>
    </div>
  );
};

export default StockForm;
