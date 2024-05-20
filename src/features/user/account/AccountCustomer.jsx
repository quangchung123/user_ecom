import React, {useEffect, useState} from 'react';
import FormAccount from "../../../components/Form/FormAccount";
import FormAddress from "../../../components/Form/FormAddress";

const AccountCustomer = () => {
	const [selectedTab, setSelectedTab] = useState("personal");

	useEffect(() => {
		window.scrollTo(0, 0)
	}, []);
	return (
		<div className="flex justify-center box-border py-12 px-28">
			<aside className="mr-2">
				<ul>
					<li
						onClick={() => setSelectedTab("personal")}
						className={`${
							selectedTab === "personal"
								? "bg-gray-300"
								: ""
						} cursor-pointer text-gray-500 px-4 py-2.5 mb-3 rounded hover:bg-gray-200`}
					>
						<i className="bi bi-person-circle mr-2"></i>
						<span>Thông tin cá nhân</span>
					</li>
					<li
						onClick={() => setSelectedTab("address")}
						className={`${
							selectedTab === "address"
								? "bg-gray-300"
								: ""
						} cursor-pointer text-gray-500 px-4 py-2.5 mb-3 rounded hover:bg-gray-200`}
					>
						<i className="bi bi-geo-alt-fill mr-2"></i>
						<span>Địa chỉ nhận hàng</span>
					</li>
				</ul>
			</aside>
			<div className="h-auto border bg-white w-1/2 rounded">
				{selectedTab === "personal" && <FormAccount />}
				{selectedTab === "address" && <FormAddress />}
			</div>
		</div>
	);
};

export default AccountCustomer;
