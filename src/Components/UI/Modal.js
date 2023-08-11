import { Fragment,useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import ModalContext from "../../Store/Modal-Context";

function Backdrop(props) {
    const modalContext = useContext(ModalContext);


  return <div onClick={modalContext.onChangeVisibility} className={classes.backdrop} > </div>;
}

function ModalOverlay(props) {
    
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

function Modal(props) {
  
 const portalElement = document.getElementById("overlays");
  
    return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay >{props.children}</ModalOverlay>,portalElement)}
    </Fragment>
  );
}

export default Modal;
