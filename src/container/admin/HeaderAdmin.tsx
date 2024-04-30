import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {logout} from "@/services/storage/userSlice";
import {logoUrl} from "@/config/app";
import {user} from "@/config/constant";

const HeaderAdmin = () => {
    const info = useSelector((state: any) => state.user.info);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        router.push("/auth/login");
    }

    const opneMenu = ()=>{
        const sidebar = document.getElementById("sidebar");
        if(sidebar){
            sidebar.classList.toggle("open-side-bar");
            const isOpen = document.getElementById("icon-open-nav")!.classList.toggle("bi-x-lg");
            if(!isOpen){
                document.getElementById("icon-open-nav")!.classList.add("bi-list");
            }
        }
    }

    return (
        <nav
            className="fixed top-0 z-[10] w-full bg-white border-b border-gray-200  dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button onClick={opneMenu} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <i id={"icon-open-nav"} className="bi bi-list"></i>
                        </button>
                        <div className="text-accent text-xl uppercase font-bold pr-px ml-3">
                            Admin
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex space-x-5 items-center ml-3">
                            < a
                                role={"button"}
                                className={`flex gap-1 md:bg-transparent text-primary md:hover:text-primary pl-3 pr-4 py-2 md:p-0 rounded focus:outline-none`}
                                aria-current="page"
                            >
                                {/*{user.phone_number}*/}
                            </a>
                            <div>
                                <i className="bi bi-bell-fill text-accent text-lg"></i>
                            </div>
                            <div onClick={handleLogout} role={"button"} className={"rounded-full flex items-center justify-center bg-blue-300 h-8 w-8"}>
                                <i className="bi bi-box-arrow-right text-white ml-[2px]"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderAdmin;
