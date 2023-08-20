import { useState } from "react";

const useInputValidation = (inputValidationFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isInputValueValid = inputValidationFn(enteredValue);
  const hasError = !isInputValueValid && isFocused;

  function onInputChangeHandler(event){
    setEnteredValue(event.target.value);
  }

  function onInputBlurHandler(event){
    setIsFocused(true);
  }


  function reset(){
    setEnteredValue("");
    setIsFocused(false);
  }

  return {
    value:enteredValue,
    isValid:isInputValueValid,
    hasError:hasError,
    onInputChangeHandler:onInputChangeHandler,
    onInputBlurHandler:onInputBlurHandler,
    reset:reset
  };

};

export default useInputValidation;
