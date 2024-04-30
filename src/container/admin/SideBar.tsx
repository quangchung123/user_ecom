import React from 'react';
import Link from "@/components/UI/Link";
import {useRouter} from "next/router";
import {sideBarOptions, ulrAdmin} from "@/config/constant";

const SideBar = () => {
    const router = useRouter();
    return (
        <ul className="space-y-2 font-medium">
            {sideBarOptions.map((item, index) => {
                // const active = item.key === 'dashboard' ? router.pathname === ulrAdmin : (router.pathname.includes(item.router) && item.key !== 'dashboard');
                return (
                    <Link key={index} url={item.router}
                          className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-accent mt-10 group  'bg-blue-300 text-white'}`}>
                        <div dangerouslySetInnerHTML={{__html: `${item.icon}`}}></div>
                        <span className="ml-3">{item.name}</span>
                    </Link>
                )
            })}
        </ul>
    );
};

export default SideBar;
