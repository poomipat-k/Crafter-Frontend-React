import React, { useState, useCallback, useEffect } from "react";

import { useSelector } from "react-redux";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../components/UI/LodingSpinner/LoadingSpinner";
import Input from "../../../components/FormElement/Input";
import Button from "../../../components/FormElement/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validators";
import StockForm from "../../../components/FormElement/Stock";
import ImageUpload from "../../../components/FormElement/ImageUpload";
import Alert from "../../../components/UI/Alert/Alert";
import classes from "./NewPost.module.css";

const INIT_FORM_STATE = {
  category: {
    value: "",
    isValid: false,
  },
  title: {
    value: "",
    isValid: false,
  },
  description: {
    value: "",
    isValid: false,
  },
  image: {
    value: [],
    isValid: false,
  },
};
const INIT_FORM_VALID = false;

const INIT_STOCK_FORM_STATE = {
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
};

const NewPost = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(INIT_FORM_STATE, INIT_FORM_VALID);
  const [imageIndex, setImageIndex] = useState();
  const [stockFormState, setStockFormState] = useState(INIT_STOCK_FORM_STATE);
  const [stockFormIsValid, setStockFormIsValid] = useState(false);
  const [stockFormError, setStockFormError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (showSuccessAlert) {
      let animationTimer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
      return () => {
        clearTimeout(animationTimer);
      };
    }
  }, [showSuccessAlert]);

  useEffect(() => {
    setStockFormState({
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
  }, [setStockFormState]);

  const indexChangeHandler = useCallback((updatedImageIndex) => {
    setImageIndex(updatedImageIndex);
  }, []);

  const cleanStockForm = (state) => {
    // Deep copy stock state
    let cleanedState = { ...state };
    for (let sex in state) {
      cleanedState[sex] = { ...state[sex] };
      for (let size in state[sex]) {
        cleanedState[sex][size] = { ...state[sex][size] };
      }
    }
    // Delete blank field
    for (let sex in cleanedState) {
      let thisSexIsBlank = true;
      for (let size in cleanedState[sex]) {
        // if (!cleanedState[sex][size].qty || !cleanedState[sex][size].price) {
        //   delete cleanedState[sex][size];
        // }
        thisSexIsBlank =
          thisSexIsBlank &&
          !(
            cleanedState[sex][size].qty > 0 || cleanedState[sex][size].price > 0
          );
      }
      if (thisSexIsBlank) {
        delete cleanedState[sex];
      }
    }
    return cleanedState;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", formState.inputs.category.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);

      let leanStockData = cleanStockForm(stockFormState);
      formData.append("stock", JSON.stringify(leanStockData));

      let lowestPrice = 1000000;
      let maxPrice = 0;
      for (let sex in leanStockData) {
        for (let size in leanStockData[sex]) {
          let thisPrice = +leanStockData[sex][size].price;
          if (thisPrice > 0 && thisPrice < lowestPrice) {
            lowestPrice = thisPrice;
          }
          if (thisPrice > maxPrice) {
            maxPrice = thisPrice;
          }
        }
      }

      if (lowestPrice === 1000000 || maxPrice === 0) {
        throw new Error(
          "Price data is not valid! please review your price data."
        );
      }
      formData.append("price", lowestPrice);
      formData.append("maxPrice", maxPrice);

      formData.append("imageIndex", imageIndex);
      if (formState.inputs.image.value.length) {
        for (let i = 0; i < formState.inputs.image.value.length; i++) {
          formData.append("image", formState.inputs.image.value[i]);
        }
      }
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/shop`,
        "POST",
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      props.fetchCategories();
      setShowSuccessAlert(true);
      setStockFormState({
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
    } catch (err) {
      if (
        err.message ===
        "Price data is not valid! please review your price data."
      ) {
        setStockFormError(err.message);
      }
    }
  };

  return (
    <React.Fragment>
      <Alert
        show={showSuccessAlert}
        message="Successfully added a new post!"
      />
      <ErrorModal error={error} onClear={clearError} />

      <ErrorModal
        error={stockFormError}
        onClear={() => setStockFormError(false)}
      />

      <form className={classes.FormContainer} onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="category"
          element="input"
          type="text"
          label="Category"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid category."
          onInput={inputHandler}
          value={formState.inputs.category.value}
        />
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          value={formState.inputs.title.value}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
          value={formState.inputs.description.value}
        />

        <StockForm
          onInputChange={setStockFormState}
          stockFormState={stockFormState}
          setStockFormIsValid={setStockFormIsValid}
        />

        <ImageUpload
          id="image"
          onInput={inputHandler}
          onUpdatedImageIndex={indexChangeHandler}
          errorText="Please provide at least one image"
          value={formState.inputs.image.value}
        />

        <Button
          type="submit"
          disabled={!formState.isValid || !stockFormIsValid}
        >
          POST
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPost;
