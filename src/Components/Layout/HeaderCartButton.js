import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import {  useContext } from "react";
import ModalContext from "../../Store/Modal-Context";
function HeaderCartButton(props) {
  const modalContext = useContext(ModalContext);
  return (
      <button
        onClick={modalContext.onChangeVisibility}
        className={classes.button}
      >
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>3</span>
      </button>
  );
}

export default HeaderCartButton;
