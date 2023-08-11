import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";


function MealItemForm(props) {
  
  const amountRef = useRef();
  const [isFormValid,setIsFormValid] = useState(true);
  
  function amountSubmitHandler(event){
    event.preventDefault();

    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
      
      setIsFormValid(false);
      return;
    }

    props.onAddCartItem(enteredAmountNumber);


  }


  return (
    <form onSubmit={amountSubmitHandler} className={classes.form}>
      <Input
        label="Amount"
        ref={amountRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {isFormValid ? "" : <p>Please Enter Valid Input (1,5). </p>}
    </form>
  );
}

export default MealItemForm;
