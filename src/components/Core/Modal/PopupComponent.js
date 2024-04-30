import React, {cloneElement, forwardRef, useImperativeHandle, useState} from "react";
import Popup from "reactjs-popup";
import {schemaForm} from "src/config/validate";
import BoxForm from "src/components/Core/BoxForm";

const PopupComponent = ({schema,defaultValue,...props}, ref) => {
  // states
  const [open, setOpen] = useState(false);

  // Methods
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  // Core Methods
  const BModal = () => {
    if(props.button){
      return <props.button onClick={openModal} />;
    }
    return null;
  };

  const Children = () => {
    return cloneElement(props?.children, { closeModal });
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }),[])
  // Hooks

  return (
      <div>
        <BModal />
        <Popup
            open={open}
            modal
            nested
            contentStyle={{ width: 800 }}
            closeOnDocumentClick={false}
            onClose={closeModal}
            {...props}
        >
          <div className="rounded-5 px-2 mx-2">
            <div className="form-container">
              <Children/>
            </div>
          </div>
        </Popup>

      </div>
  );
};

export default forwardRef(PopupComponent);
