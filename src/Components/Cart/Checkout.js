import classes from "./Checkout.module.css";
import useInputValidation from "../../hooks/use-inputValidation";
import useHttp from "../../hooks/use-http";
import { useContext } from "react";
import CartContext from "../../Store/Cart-Context";
const Checkout = (props) => {
  const cartCtx = useContext(CartContext);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    onInputChangeHandler: nameInputChangeHandler,
    onInputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInputValidation((name) => name.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetHasError,
    onInputChangeHandler: streetInputChangeHandler,
    onInputBlurHandler: streetInputBlurHandler,
    reset: resetStreetInput,
  } = useInputValidation((street) => street.trim() !== "");

  const {
    value: enteredPostal,
    isValid: enteredPostalIsValid,
    hasError: postalHasError,
    onInputChangeHandler: postalInputChangeHandler,
    onInputBlurHandler: postalInputBlurHandler,
    reset: resetPostalInput,
  } = useInputValidation(
    (postal) => postal.trim() !== "" && postal.trim().length === 5
  );

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityHasError,
    onInputChangeHandler: cityInputChangeHandler,
    onInputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInputValidation((city) => city.trim() !== "");

  const { isLoading, error, sendRequest } = useHttp();

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredCityIsValid &&
    enteredPostalIsValid &&
    enteredStreetIsValid
  ) {
    formIsValid = true;
  }

  const checkoutSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    sendRequest(
      {
        url: "https://reactmeals-cf87c-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          user: {
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity,
          },
          items:cartCtx.items
        },
      },
      null
    );

    props.showSuccessAlert();

    cartCtx.clearItemsHandler();
    props.closeform();
    
    resetNameInput();
    resetCityInput();
    resetStreetInput();
    resetPostalInput();
  };

  const nameInputClass = nameHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const streetInputClass = streetHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const postalInputClass = postalHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const cityInputClass = cityHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form className={classes.form} onSubmit={checkoutSubmitHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          onChange={nameInputChangeHandler}
          value={enteredName}
          onBlur={nameInputBlurHandler}
        />
        {nameHasError && <p className={classes.invalid}>Name Is Not Valid</p>}
      </div>
      <div className={streetInputClass}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          onChange={streetInputChangeHandler}
          value={enteredStreet}
          onBlur={streetInputBlurHandler}
        />
        {streetHasError && (
          <p className={classes.invalid}>Street Is Not Valid</p>
        )}
      </div>
      <div className={postalInputClass}>
        <label htmlFor="postal">Postal Code</label>
        <input
          id="postal"
          type="text"
          onChange={postalInputChangeHandler}
          value={enteredPostal}
          onBlur={postalInputBlurHandler}
        />
        {postalHasError && (
          <p className={classes.invalid}>Postal Is Not Valid</p>
        )}
      </div>
      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          onChange={cityInputChangeHandler}
          value={enteredCity}
          onBlur={cityInputBlurHandler}
        />
        {cityHasError && <p className={classes.invalid}>City Is Not Valid</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.closeform}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          {isLoading ? "Loading ..." : "Confirm"}
        </button>
      </div>
      {error ? <p className={classes.invalid}>{error}</p> : ""}
    </form>
  );
};
export default Checkout;
