//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React from "react";

export function InputField({ label, onChangeValue, value, type = "text" }) {
  return (
      <div>
        <label>
          {label}{" "}
          <input
              type={type}
              value={value}
              placeholder={type}
              onChange={(e) => onChangeValue(e.target.value)}
          />
        </label>
      </div>
  );
}
