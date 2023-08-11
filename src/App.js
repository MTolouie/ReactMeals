import React,{ Fragment, useContext } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import ModalContext from "./Store/Modal-Context";
function App() {
  
  const modalContext = useContext(ModalContext);
  
  return (
    <Fragment>
      {modalContext.isAvailable && <Cart/>}
      <Header/>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
