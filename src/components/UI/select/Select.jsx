import React from "react";
import cl from "./Select.module.css";

const Select = React.forwardRef((props, ref) => {
  const status = ["Действителен", "Приостановлен", "Просрочен", "Изъят"];
  return (
    <select
      ref={ref}
      {...props}
      className={cl.Select}
      name="status"
      placeholder="Статус пропуска"
      defaultValue=""
    >
      <option value="" disabled hidden>
        Статус пропуска
      </option>
      {status.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});

export default Select;
