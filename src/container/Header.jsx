import React from 'react';
import {logoIcon} from "../assets/index"
import MyButton from "../components/Elements/Button/MyButton";
import {useDispatch} from "react-redux";
import {setTheme} from "../store/action/changeThemeSlice";
import useModal from "../hooks/useModal";
import {useNavigate} from "react-router-dom";
import {setState} from "../store/action/resetStateSlice";
import {ROUTER_INIT} from "../config/constant";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isShowing, toggle} = useModal();
  const handleNavigateLogin = () => {
    dispatch(setState());
    navigate(ROUTER_INIT.LOGIN);
  }
  dispatch(setTheme({theme: isShowing}));
  return (
    <nav className="h-full">
      <ul className="flex justify-end items-center h-full box-border pr-10">
        <li className="mr-5">
          <MyButton onClick={toggle}>
            <i className="bi bi-moon-fill text-icon dark:text-white"></i>
          </MyButton>
        </li>
        <li className="flex items-center mr-5">
          <img src={logoIcon} alt="logoAdmin" className="h-10 border rounded-full"/>
          <span className="dark:text-icon ml-1.5">
            Admin
          </span>
        </li>
        <li className="mr-5">
          <MyButton styleModify={"p-1.5 hover:bg-accent rounded-full"} onClick={handleNavigateLogin}>
            <i className="bi bi-door-open-fill text-3xl text-red-500 "></i>
          </MyButton>
        </li>
      </ul>
    </nav>
    );
};

export default Header;