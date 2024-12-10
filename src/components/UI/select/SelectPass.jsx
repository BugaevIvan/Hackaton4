import React from "react";

const SelectPass = (props) => {
  return (
    <div className="line">
      <label htmlFor={props.name}>{props.title}</label>
      <select
        name={props.name}
        id={props.name}
        disabled={props.isEditMode === true ? false : true}
        style={props.isEditMode === true ? {} : { appearance: "none" }}
        {...(props.pass === undefined
          ? { defaultValue: "" }
          : props.isEditMode === true
          ? {}
          : { value: props.pass[props.name] })}
      >
        <option value="" disabled hidden></option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPass;
