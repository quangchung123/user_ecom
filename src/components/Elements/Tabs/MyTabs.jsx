import React, {useState} from 'react';
import MyButton from "../Button/MyButton";

const MyTabs = ({tabs, setTabSelected, tabSelected}) => {
		const handleSelectTab = (key) => {
				setTabSelected(key);
		}
		return (
				<div className="flex mr-2.5 md:mx-2.5 border-b-[1px] border-slate-400 mt-5">
						{tabs.map((tab, index) => (
									<div key={index}>
											<MyButton onClick={() => handleSelectTab(tab.key)} styleModify={`w-28 h-9 p-2  flex-col justify-center items-center ${
													tab.key === tabSelected ? 'border-b-4 border-primary text-black font-bold' : 'text-gray-500 font-semibold'}`}>
													{tab.label}
											</MyButton>
									</div>
						))}
				</div>
		);
};

export default MyTabs;