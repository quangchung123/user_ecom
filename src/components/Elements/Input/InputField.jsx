import React from 'react';
import { Controller } from "react-hook-form";

const InputField = ({ name, type, placeholder, control, errors, inputType, options }) => {
  const renderInputType = (field) => {
    switch (inputType) {
      case 'textarea':
        return <textarea placeholder={placeholder} value={field.value} required={true} {...field} />;
      case 'select':
        return (
          <select {...field} value={field.value} onChange={(e) => field.onChange(e.target.value)} required={true}>
            <option>All</option>
            {options.map((option, index) => (
              <option key={index} value={option.title}>
                {option.title}
              </option>
            ))}
          </select>
        );
      default:
        return <input type={type} placeholder={placeholder} {...field} value={field.value} required={true} />;
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
            { errors[name] && (
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
