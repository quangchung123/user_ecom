import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import logo from "../assets/image/logo.png";
import useModal from "../hooks/useModal";
import MyButton from "../components/Elements/Button/MyButton";

const Content = ({children}) => {
    const {isShowing, toggle} = useModal();
    return (
        <div className={`min-h-screen grid ${isShowing? 'grid-cols-hiddenCol': 'grid-cols-customCol'}`}>
            <aside className="col-span-1 min-h-screen dark:bg-[#0f172a] dark:border-none border-r bg-white">
                <div className="">
                    <div className="flex justify-center items-center px-2 py-4 ">
                        <a href="/admin" className="mr-3.5">
                            <img src={logo} alt="logo" className={isShowing? "w-0":"w-full"}/>
                        </a>
                        <MyButton styleModify={`hover:bg-accent dark:hover:bg-gray-800 p-2 rounded ${isShowing ? '-ml-4' : 'ml-4'}`} onClick={toggle}>
                            <i className="bi bi-list text-3xl dark:text-icon"></i>
                        </MyButton>
                    </div>
                    <div className="box-border mx-2">
                        <Sidebar isShowing={isShowing}/>
                    </div>
                </div>
            </aside>
            <div className="col-span-1">
                <div className="h-[75px] dark:bg-gray-800 bg-white border-b border-slate-300 dark:border-none">
                    <Header />
                </div>
                <div className="min-h-[calc(100vh-75px)] bg-content dark:bg-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Content;
