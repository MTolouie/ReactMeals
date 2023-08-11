import classes from "./MealsItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/Cart-Context";
import { useContext } from "react";

function MealItem(props) {
    const price = `$${props.price.toFixed(2)}`
  
    const cartCtx = useContext(CartContext);

    function AddCartItem(amount){
      cartCtx.addItem({
        id:props.id,
        name:props.name,
        amount:amount,
        price:props.price
      });
    }
  
    return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddCartItem={AddCartItem}/>
      </div>
    </li>
  );
}

export default MealItem;
