import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import ModalContext from "../../Store/Modal-Context";
import { useContext } from "react";

function Cart() {

  const modalContext = useContext(ModalContext);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button onClick={modalContext.onChangeVisibility} className={classes["button--alt"]}>Close</button>
        <button  className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
