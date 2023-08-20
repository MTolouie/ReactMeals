import classes from "./Checkout.module.css";
import useInputValidation from "../../hooks/use-inputValidation";
const Checkout = (props) => {
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
  } = useInputValidation((postal) => postal.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityHasError,
    onInputChangeHandler: cityInputChangeHandler,
    onInputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInputValidation((city) => city.trim() !== "");

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

    if (
      !enteredNameIsValid &&
      !enteredCityIsValid &&
      !enteredPostalIsValid &&
      !enteredStreetIsValid
    ) {
      return;
    }

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
        {streetHasError && <p className={classes.invalid}>Street Is Not Valid</p>}
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
        {postalHasError && <p className={classes.invalid}>Postal Is Not Valid</p>}
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
        <button
          disabled={!formIsValid}
          className={classes.submit}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
