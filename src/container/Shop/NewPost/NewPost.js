import React, { useState, useCallback } from "react";

import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../components/UI/LodingSpinner/LoadingSpinner";
import Input from "../../../components/FormElement/Input";
import Button from "../../../components/FormElement/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../../shared/utils/validators";
import ImageUpload from "../../../components/FormElement/ImageUpload";
import classes from "./NewPost.module.css";

const INIT_FORM_STATE = {
  category: {
    value: "",
    isValid: false
  },
  title: {
    value: "",
    isValid: false
  },
  description: {
    value: "",
    isValid: false
  },
  price: {
    value: "",
    isValid: false
  },
  stock: {
    value: "",
    isValid: false
  },
  image: {
    value: [],
    isValid: false
  }
};

const INIT_FORM_VALID = false;

const NewPost = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    INIT_FORM_STATE,
    INIT_FORM_VALID
  );
  const [imageIndex, setImageIndex] = useState();

  const indexChangeHandler = useCallback(updatedImageIndex => {
    setImageIndex(updatedImageIndex);
  }, []);

  const submitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", formState.inputs.category.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("stock", formState.inputs.stock.value);
      formData.append("imageIndex", imageIndex);
      if (formState.inputs.image.value.length) {
        for (let i = 0; i < formState.inputs.image.value.length; i++) {
          formData.append("image", formState.inputs.image.value[i]);
        }
      }
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/shop`,
        "POST",
        formData
      );
    } catch (err) {}
    
    const fetchCategories = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/shop/categories`
        );
        props.setCategories(responseData.categories);
      } catch (err) {}
    };
    fetchCategories();

    setFormData(INIT_FORM_STATE, false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

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
        <Input
          id="price"
          element="input"
          type="number"
          label="Price"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid price."
          onInput={inputHandler}
          value={formState.inputs.price.value}
        />
        <Input
          id="stock"
          element="input"
          type="number"
          label="Stock"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid stock."
          onInput={inputHandler}
          value={formState.inputs.stock.value}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          onUpdatedImageIndex={indexChangeHandler}
          errorText="Please provide at least one image"
          value={formState.inputs.image.value}
        />
        <Button type="submit" disabled={!formState.isValid}>
          POST
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPost;
