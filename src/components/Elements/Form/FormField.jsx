import React, {useMemo} from 'react';
import InputField from "../Input/InputField";
import styles from "./FormField.module.scss"
import dataCities from "../../../config/address/cities.json";

const FormField = ({ control, errors, name, placeholder, label, type = "text", inputType, options, typeSelect,readonly }) => {
		return (
				<div>
						<label>{label}</label>
						<InputField
								name={name}
								type={type}
								control={control}
								placeholder={placeholder}
								errors={errors}
								inputType={inputType}
								options={options}
								typeSelect={typeSelect}
								readonly={readonly}
						/>
				</div>
		);
};

export default FormField;
