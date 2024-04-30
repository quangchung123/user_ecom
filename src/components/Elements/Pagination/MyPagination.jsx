import React from 'react';
import styles from './Pagination.module.scss'
import {nextIcon, previousIcon} from "../../../assets";

const Pagination = ({setCurrentPage, pageNumbers,currentPage, totalPage}) => {
		const goToPage = (page) => {
				setCurrentPage(page);
		};
		return (
				<div className={styles.elementPagination}>
						<button className={`${currentPage > 1 ? styles.unSelectedPage : styles.buttonPagination}`} onClick={() => goToPage( 1)} disabled={currentPage === 1}>
								First
						</button>
						<button className={`${currentPage > 1 ? styles.unSelectedPage : styles.buttonPagination}`} onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
								<img src={previousIcon} alt={"previousIcon"}/>
						</button>
						{pageNumbers.map((number) => (
								<button className={`${currentPage === number? styles.selectedPage: styles.unSelectedPage}`} key={number} onClick={() => goToPage(number)}>
										{number}
								</button>
						))}
						<button className={styles.buttonPagination} onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPage}>
								<img src={nextIcon} alt={"nextIcon"}/>
						</button>
						<button className={`${styles.buttonPagination} ${styles.buttonLast}`} onClick={() => goToPage(totalPage)} disabled={currentPage === totalPage}>
								Last
						</button>
				</div>
		);
};

export default Pagination;