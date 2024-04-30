import React, { useState } from "react";
import { useDispatch } from "react-redux";
import tabSlice from "@/services/storage/tabSlice";
import styles from "@/components/Admin/Tab/tab.module.css";

const MyTab = ({ tabs }) => {
    const keys = tabs.map(tab => tab.key )
    const [activeTab, setActiveTab] = useState(tabs[0].key);
    const dispatch = useDispatch();

    const handleTabClick = (key) => {
        dispatch(tabSlice.actions.tab({ tabId: key }));
        setActiveTab(key);
    };

    return (
        <div>
            <div className={`md:pl-2 ${styles.less_xs_pl_6} md:mx-10 less_xs:flex less_xs:justify-center border-b-[1px] border-slate-400`}>
                {tabs.map((tab) => (
                    <div className="inline-block " key={tab.key}>
                        <button
                            onClick={() => handleTabClick(tab.key)}
                            className={`w-28 h-9 p-2  flex-col justify-center items-center ${
                                tab.key === activeTab ? 'border-b-4 border-accent text-black font-bold' : 'text-gray-500 font-semibold'
                            }`}
                        >
                            {tab.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTab;
