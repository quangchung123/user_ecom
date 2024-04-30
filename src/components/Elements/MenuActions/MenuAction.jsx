import React from 'react';
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import styles from "./MenuAction.module..scss"

const MenuAction = ({data, value}) => {
		return (
				<div className={styles.menus}>
						<Menu
								menuButton={ <MenuButton><i className="bi bi-three-dots"></i></MenuButton> }
								arrow={true}
								className={"hover:bg-primary"}
						>
								{data.map(({title, handleRowAction}) => (
										<MenuItem onClick={()=> handleRowAction(value._id)}>
												{title}
										</MenuItem>
								))}
						</Menu>
				</div>
		);
};

export default MenuAction;