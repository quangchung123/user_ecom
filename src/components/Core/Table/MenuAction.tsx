import {ClickEvent, EventHandler, Menu, MenuButton, MenuItem} from "@szhsin/react-menu";
import {IDataAction, IReactWithChildren} from "@/types";
import React from "react";


const MenuAction: IReactWithChildren<{ data: IDataAction,onItemClick:EventHandler<ClickEvent> }> = ({data,onItemClick, children}) => {
    return (
        <div className="menus">
            <Menu
                onItemClick={onItemClick}
                className={"hover:bg-primary"}
                menuButton={ <MenuButton><i className="bi bi-three-dots"></i></MenuButton>}
                direction={"right"}
                align={"center"}
                position={"auto"}
                viewScroll={"auto"}
                arrow={true}
                gap={12}
                shift={12}
            >
                {data.map(({key,title,value}) => (
                    <MenuItem key={key} value={value}>{title}</MenuItem>
                ))}
            </Menu>
        </div>
    );
}
export default MenuAction
