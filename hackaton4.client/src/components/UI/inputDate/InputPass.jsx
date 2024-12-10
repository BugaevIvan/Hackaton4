import React from "react";

const InputPass = (props) => {
  return (
    <div className="line">
      <label htmlFor={props.name}>{props.title}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        {...(props.pass === undefined
          ? {}
          : props.isEditMode === true
          ? {}
          : { value: props.pass[props.name] })}
        disabled={props.isEditMode === true ? false : true}
      />
    </div>
  );
};

export default InputPass;
