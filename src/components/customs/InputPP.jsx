import React, { useState } from "react";

const InputPP = ({
  id,
  parenetClassName = "",
  className = "",
  label = "",
  labelClassName = "",
  type,
  placeholder,
  value = "",
  errorState = "",
  changeFunction,
  brClass = "",
  required = true
}) => {
  // const [inputValue, setInputValue] = state;
  const [error, setError] = errorState;
  return (
    <div className={`${parenetClassName} `}>
      <label htmlFor={id} className={`${labelClassName} `}>
        {label}{" "}
        <span className={required ? `text-[#f45138]` : "hidden"}>*</span>
      </label>{" "}
      <br className={brClass} />
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${className} border ${
          error ? "border-[#d81111]" : "border-[#d7d5d5]"
        }  focus:outline-none  `}
        onChange={changeFunction}
        name={id}
        defaultValue={value}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      />
      {error && (
        <h1 className="text-[#b54a39]  text-sm">Please Fill the {label}</h1>
      )}
    </div>
  );
};

export default InputPP;
