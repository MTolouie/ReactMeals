import React, { useState } from "react";

const ModalContext = React.createContext({
    isAvailable : false,
    onChangeVisibility:()=> {}
});

export function ModalContextProvider(props){

    const [isvisible,setIsVisible] = useState(false);

    function ChangeVisibility(){
        console.log(isvisible);
        setIsVisible((prevState) => {return !prevState});
    }
    
    return (
        <ModalContext.Provider value={{
            isAvailable : isvisible,
            onChangeVisibility:ChangeVisibility
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}


export default ModalContext;