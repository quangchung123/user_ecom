import React, { useEffect, useState } from 'react';
import styles from "./InputSearch.module.scss"

const InputSearch = ({setValueInput}) => {
		const [searchTerm, setSearchTerm] = useState('');
		setValueInput(searchTerm);
		const handleChange = (e) => {
				const valueInput = e.target.value;
				setSearchTerm(valueInput);
		};
		return (
				<div className={styles.inputSearch}>
						<input
								type="text"
								placeholder="Search name"
								value={searchTerm}
								onChange={handleChange}
						/>
						{/*<i className="bi bi-search"></i>*/}
				</div>
		);
};

export default InputSearch;
