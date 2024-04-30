import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { IReactWithChildren } from '@/types';
import SideBar from '@/container/admin/SideBar';
import HeaderAdmin from '@/container/admin/HeaderAdmin';

const LayoutAdmin: IReactWithChildren<any> = ({ children }) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            router.push('/auth/login');
        }
        setMounted(true);
    }, []);

    return (
        <React.Fragment>
            {/*{mounted && localStorage.getItem('token') === user.password && (*/}
                <div>
                    <HeaderAdmin />
                    <aside
                        id="sidebar"
                        className="fixed top-0 left-0 z-[9] w-64 h-screen pt-[57px] transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-200"
                        aria-label="Sidebar"
                    >
                        <div className="h-full px-3 overflow-y-auto bg-[#0e0c28] ">
                            <SideBar />
                        </div>
                    </aside>
                    <div className="sm:ml-64 pt-[56px] min-h-screen bg-[#efeff6] relative">
                        {children}
                    </div>
                </div>
            {/*)}*/}
        </React.Fragment>
    );
};

export default LayoutAdmin;
