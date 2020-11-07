import React, { useState, useEffect } from "react";

import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useSelector } from "react-redux";
import Input from "../../../components/FormElement/Input";
import Button from "../../../components/FormElement/Button";
import classes from "./Address.module.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_NUMBER,
} from "../../../shared/utils/validators";

import LoadingSpinner from "../../../components/UI/LodingSpinner/LoadingSpinner";
import ErrorModal from "../../../components/UI/Modal/ErrorModal";

const Address = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { token } = useSelector((state) => state.auth);
  const [formState, inputHandler, setFormData] = useForm(
    {
      address: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      zipcode: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [addressDisplayMode, setAddressDisplayMode] = useState("");
  const [fetchedLocation, setFetchedLocation] = useState();

  // Fetch user location
  useEffect(() => {
    const getLocationData = async () => {
      let response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/location`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      );
      return response.location;
    };
    getLocationData()
      .then((data) => {
        setFetchedLocation(data);
      })
      .catch((err) => {
        setAddressDisplayMode("error");
      });
  }, [sendRequest, token]);

  // Update display mode
  useEffect(() => {
    try {
      if (fetchedLocation && fetchedLocation.address) {
        setAddressDisplayMode("display");
      } else if (fetchedLocation) {
        setAddressDisplayMode("add");
      }
    } catch (err) {
      console.log(err);
    }
  }, [fetchedLocation]);

  const saveLocationHandler = () => {
    const updateLocation = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/cart/location`,
          "POST",
          JSON.stringify({
            address: formState.inputs.address.value,
            city: formState.inputs.city.value,
            zipcode: formState.inputs.zipcode.value,
            phone: formState.inputs.phone.value,
          }),
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        );
        return response.location;
      } catch (err) {}
    };
    updateLocation()
      .then((data) => {
        setFetchedLocation(data);
        setAddressDisplayMode("display");
      })
      .catch((err) => {
        setAddressDisplayMode("error");
      });
  };

  const cancelModifyLocationHandler = () => {
    if (fetchedLocation) {
      if (fetchedLocation.address) {
        setAddressDisplayMode("display");
      } else {
        setAddressDisplayMode("add");
      }
    }
  };

  const onEditLocationHandler = () => {
    if (fetchedLocation.address) {
      setFormData(
        {
          address: {
            value: fetchedLocation.address,
            isValid: true,
          },
          city: {
            value: fetchedLocation.city,
            isValid: true,
          },
          zipcode: {
            value: fetchedLocation.zipcode,
            isValid: true,
          },
          phone: {
            value: fetchedLocation.phone,
            isValid: true,
          },
        },
        true
      );
    }
    setAddressDisplayMode("edit");
  };

  let displayAddress;
  switch (addressDisplayMode) {
    case "edit":
      displayAddress = (
        <div className={classes.FormContainer}>
          {isLoading && <LoadingSpinner asOverlay />}
          <ErrorModal error={error} onClear={clearError} />
          <Input
            id="address"
            element="textarea"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address"
            onInput={inputHandler}
            value={formState.inputs.address.value}
          />

          <div className={classes.cityZipPhone}>
            <div className={classes.city}>
              <Input
                id="city"
                element="input"
                type="text"
                label="City/Province"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid city"
                onInput={inputHandler}
                value={formState.inputs.city.value}
              />
            </div>

            <div className={classes.zipcode}>
              <Input
                id="zipcode"
                element="input"
                type="text"
                label="Zipcode"
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(5),
                  VALIDATOR_MAXLENGTH(5),
                  VALIDATOR_NUMBER(formState.inputs.zipcode.value),
                ]}
                errorText="Please enter a valid zipcode"
                onInput={inputHandler}
                value={formState.inputs.zipcode.value}
              />
            </div>

            <div className={classes.phone}>
              <Input
                id="phone"
                element="input"
                type="text"
                label="Phone Number"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid phone number."
                onInput={inputHandler}
                value={formState.inputs.phone.value}
              />
            </div>
          </div>
          <div>
            <Button onClick={cancelModifyLocationHandler}>Cancle</Button>
            <Button
              onClick={saveLocationHandler}
              disabled={!formState.isValid}
              success
            >
              Save Location
            </Button>
          </div>
        </div>
      );
      break;
    case "display":
      displayAddress = (
        <div className={classes.DisplayContainer}>
          <h2 style={{ paddingLeft: "16px", margin: "0px" }}>Location</h2>

          <div className={classes.DisplayData}>
            <label>Address: </label>
            {fetchedLocation.address}
          </div>

          <div className={classes.DisplayData}>
            <label>City: </label>
            {fetchedLocation.city}
          </div>
          <div className={classes.DisplayData}>
            <label>Zipcode: </label>
            {fetchedLocation.zipcode}
          </div>
          <div className={classes.DisplayData}>
            <label>Phone number: </label>
            {fetchedLocation.phone}
          </div>
          <div style={{ marginTop: "16px", marginLeft: "16px" }}>
            <Button onClick={onEditLocationHandler}>Edit location</Button>
          </div>
        </div>
      );
      break;
    case "":
      displayAddress = (
        <div className="center" style={{ margin: "64px" }}>
          <LoadingSpinner />
        </div>
      );
      break;
    case "error":
      displayAddress = (
        <h1 className="center" style={{ color: "red" }}>
          Something went wrong. Could not fetch location address from server,
          please try again.
        </h1>
      );
      break;
    case "add":
      displayAddress = (
        <div>
          <h2 className="center">No location data.</h2>
          <div style={{ width: "100px", margin: "auto" }}>
            <Button onClick={() => setAddressDisplayMode("edit")} success>
              Add Location
            </Button>
          </div>
        </div>
      );
      break;
    default:
      displayAddress = <h1>Default case, should not reach here</h1>;
  }

  return displayAddress;
};

export default Address;
