import React from 'react';
import InputField from "../Input/InputField";
import styles from "./FormField.module.scss"

const FormField = ({ control, errors, name, placeholder, label, type = "text", inputType, options }) => {
		return (
				<div className={styles.formItem}>
						<label>{label}</label>
						<InputField
								name={name}
								type={type}
								control={control}
								placeholder={placeholder}
								errors={errors}
								inputType={inputType}
								options={options}
						/>
						{errors && errors[name] && (
								<span className="text-red-500 text-sm mt-1">{errors[name].message}</span>
						)}
				</div>
		);
};

export default FormField;
