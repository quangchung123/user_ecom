import React from 'react';
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import styles from "./MenuAction.module..scss"

const MenuAction = ({data, value, title, children, styleButton}) => {
		return (
				<div className={styles.menus}>
						<Menu
								menuButton={ <MenuButton className={styleButton}>{children} {title}</MenuButton> }
								arrow={true}
						>
								{data.map(({title, handleRowAction}, index) => (
									<div key={index}>
										<MenuItem onClick={()=> handleRowAction()}>
											{title}
										</MenuItem>
									</div>
								))}
						</Menu>
				</div>
		);
};

export default MenuAction;