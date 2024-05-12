import React from 'react';
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setDataCity } from "../../../store/action/dataCitySelectedSlice";

const InputField = ({ name, type, placeholder, control, errors, inputType, options, typeSelect, readonly }) => {
  const renderInputType = (field) => {
    switch (inputType) {
      case 'textarea':
        return <textarea placeholder={placeholder} {...field} />;
      case 'select':
        return (
          <select {...field} onChange={(e) => {field.onChange(e.target.value)}} required={true}>
            <option value="">All --</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        );
      default:
        return <input type={type} placeholder={placeholder} {...field} readOnly={readonly} />;
    }
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            {renderInputType(field)}
            {errors[name] && (
              <p role="alert" className="error text-second text-sm">
                {errors[name].message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default InputField;
