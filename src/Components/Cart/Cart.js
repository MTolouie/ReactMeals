import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import ModalContext from "../../Store/Modal-Context";
import { useContext, useState } from "react";
import CartContext from "../../Store/Cart-Context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart() {
  const modalContext = useContext(ModalContext);
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isCheckoutSubmited,setIsCheckoutSubmited] = useState(false);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const hasItem = cartContext.items.length > 0;

  function removeFromCartHandler(id) {
    cartContext.removeItem(id);
  }

  function addToCartHandler(item) {
    // cartContext.addItem({item,amount:1});
    cartContext.addItem({ ...item, amount: 1 });
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addToCartHandler.bind(null, item)}
          onRemove={removeFromCartHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const onOrderBtnClicked = () => {
    setIsCheckout(true);
  };

  const closeCheckout = () => {
    setIsCheckout(false);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button
        onClick={modalContext.onChangeVisibility}
        className={classes["button--alt"]}
      >
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={onOrderBtnClicked}>
          Order
        </button>
      )}
    </div>
  );

  const showSuccess = () => {
    setIsCheckoutSubmited(true);
  };

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckoutSubmited && <h2 className={classes.success}>Form Submited</h2>}
      {isCheckout && (
        <Checkout showSuccessAlert={showSuccess} closeform={closeCheckout} />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
}

export default Cart;
