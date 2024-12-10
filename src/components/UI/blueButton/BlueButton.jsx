import React from "react";
import cl from "./BlueButton.module.css";

const BlueButton = React.forwardRef((props, ref) => {
  return <input type="button" className={cl.BlueButton} {...props} ref={ref} />;
});

export default BlueButton;
