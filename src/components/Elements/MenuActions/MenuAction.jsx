import React from 'react';
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import styles from "./MenuAction.module..scss"

const MenuAction = ({data, value, title, children}) => {
		return (
				<div className={styles.menus}>
					{children}
						<Menu
								menuButton={ <MenuButton>{title}</MenuButton> }
								arrow={true}
								className={"hover:bg-primary"}
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