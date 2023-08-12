import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import ModalContext from "../../Store/Modal-Context";
import CartContext from "../../Store/Cart-Context";
function HeaderCartButton(props) {
  const modalContext = useContext(ModalContext);
  const cartContext = useContext(CartContext);

  const [isBtnAnimated, setIsBtnAnimated] = useState(false);
  const { items } = cartContext;

  const CartItemsCount = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${isBtnAnimated ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length < 1) {
      return;
    }
    
    setIsBtnAnimated(true);
    
    const timer = setTimeout(() => {
      setIsBtnAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button onClick={modalContext.onChangeVisibility} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{CartItemsCount}</span>
    </button>
  );
}

export default HeaderCartButton;
