import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ModalContextProvider } from "./Store/Modal-Context";
import { CartContextProvider } from "./Store/Cart-Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartContextProvider>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </CartContextProvider>
);
