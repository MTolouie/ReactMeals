import React, { useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultCartState = {
    items:[],
    totalAmount:0
}


function cartReducer(state,action){
    
    if(action.type === "ADD"){
        const updatedItems = state.items.concat(action.items);
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount );

        return {items:updatedItems,totalAmount :updatedTotalAmount};
    }

    if(action.type === "REMOVE"){

    }
    
    
    return defaultCartState;
}


export function CartContextProvider(props) {
 
  const [cartState,dispatchCartState] = useReducer(cartReducer,defaultCartState);
 
 
  function addItemHandler(item) {
    dispatchCartState({type:"ADD",item:item});
  }

  function removeItemHandler(id) {
    dispatchCartState({type:"REMOVE",id:id});

  }

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
