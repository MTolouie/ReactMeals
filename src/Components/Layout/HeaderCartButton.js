import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import {  useContext } from "react";
import ModalContext from "../../Store/Modal-Context";
import CartContext from "../../Store/Cart-Context";
function HeaderCartButton(props) {
  const modalContext = useContext(ModalContext);
  const cartContext = useContext(CartContext);

  const CartItemsCount = cartContext.items.reduce((curNumber,item)=>{return curNumber + item.amount},0);

  return (
      <button
        onClick={modalContext.onChangeVisibility}
        className={classes.button}
      >
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{CartItemsCount}</span>
      </button>
  );
}

export default HeaderCartButton;
