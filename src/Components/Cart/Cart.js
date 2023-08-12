import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import ModalContext from "../../Store/Modal-Context";
import { useContext } from "react";
import CartContext from "../../Store/Cart-Context";
import CartItem from "./CartItem";

function Cart() {
  const modalContext = useContext(ModalContext);
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const hasItem = cartContext.items.length > 0;

  function removeFromCartHandler(id) {
    cartContext.removeItem(id);
  }

  function addToCartHandler(item) {
    // cartContext.addItem({item,amount:1});
    cartContext.addItem({...item,amount:1});
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addToCartHandler.bind(null, item)}
          onRemove={removeFromCartHandler.bind(null,item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={modalContext.onChangeVisibility}
          className={classes["button--alt"]}
        >
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
