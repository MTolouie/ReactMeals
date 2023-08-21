import React, { useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItemsHandler:()=>{}
});

const defaultCartState = {
    items:[],
    totalAmount:0
}


function cartReducer(state,action){
    
    if(action.type === "ADD"){
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount );

        const existingItemIndex = state.items.findIndex((item)=> item.id === action.item.id);
        const existingItem = state.items[existingItemIndex];

        let updatedItems;
        if(existingItem){
          const updatedItem = {
            ...existingItem,
            amount : existingItem.amount + action.item.amount
          }
          updatedItems = [...state.items];
          updatedItems[existingItemIndex] = updatedItem;
        }
        else{
          updatedItems = state.items.concat(action.item);
        }

        return {items:updatedItems,totalAmount :updatedTotalAmount};
    }

    if(action.type === "REMOVE"){
      const existingItemIndex = state.items.findIndex((item)=> item.id === action.id);
      const existingItem = state.items[existingItemIndex];
      
      const updatedTotalAmount = state.totalAmount - existingItem.price;

      let updatedItems;
      if(existingItem.amount === 1)
      {
        updatedItems = state.items.filter((item)=> item.id !== action.id);
      }
      else{
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1 
        }

         updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;

      }

      return {items:updatedItems,totalAmount : updatedTotalAmount};
    } 

    if(action.type === "CLEAR"){
      return defaultCartState;
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

  function clearItemsHandler() {
    dispatchCartState({type:"CLEAR"});

  }

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItemsHandler:clearItemsHandler
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
