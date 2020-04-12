import React, { useState } from "react";

import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useDispatch } from "react-redux";
import * as actions from "../../store/action/index";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../components/UI/LodingSpinner/LoadingSpinner";
import Input from "../../components/FormElement/Input";
import Button from "../../components/FormElement/Button";
import Alert from "../../components/UI/Alert/Alert";

import classes from "./Auth.module.css";

const Auth = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        dispatch(
          actions.login(
            responseData.userId,
            responseData.token,
            null,
            responseData.isAdmin
          )
        );
        props.history.push("/");
      } catch (err) {}
    } else {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/signup`,
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setSignupSuccess(true);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <div className={classes.FormContainer}>
        <div className={classes.Form}>
          <form onSubmit={submitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}

            <Alert
              showSuccessAlert={props.location.search.includes("verified=true")}
              message="Successfully activate your account. Please try to login!"
            />

            {!isLoginMode && (
              <Input
                id="name"
                element="input"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name"
                onInput={inputHandler}
                value={formState.inputs.name.value}
              />
            )}
            <Input
              id="email"
              element="input"
              type="text"
              label="Email"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email"
              onInput={inputHandler}
              value={formState.inputs.email.value}
            />
            <Input
              id="password"
              element="input"
              type="password"
              label="Password"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password and min length 6 characters"
              onInput={inputHandler}
              value={formState.inputs.password.value}
            />

            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          </form>
          {signupSuccess && !isLoginMode && (
            <p style={{ color: "green" }}>
              Need to verify your email! Please check your inbox and activate
              your account in your email box within 24 hours
            </p>
          )}
          <div className={classes.switchButton}>
            <Button inverse onClick={switchModeHandler}>
              SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
