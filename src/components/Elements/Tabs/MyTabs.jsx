import React, {useState} from 'react';
import MyButton from "../Button/MyButton";

const MyTabs = ({tabs, setTabSelected, tabSelected}) => {
		const handleSelectTab = (key) => {
				setTabSelected(key);
		}
		return (
				<div className="border-b border-gray-300 mt-5 h-14 flex box-border px-2">
						{tabs.map((tab, index) => (
							<div key={index} className={"mr-6 h-full flex items-center"}>
								<MyButton onClick={() => handleSelectTab(tab.key)} styleModify={`w-46 h-9 p-2 h-full flex flex-col justify-center items-center ${
									tab.key === tabSelected ? 'border-b-4 border-primary text-primary' : 'text-gray-500'}`}>
									{tab.label}
								</MyButton>
							</div>
						))}
				</div>
		);
};

export default MyTabs;