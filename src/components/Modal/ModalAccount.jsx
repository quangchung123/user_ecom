import React, {useEffect, useState} from 'react';
import MyModal from "./MyModal";
import {useForm} from "react-hook-form";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
import {useSelector} from "react-redux";
import {useCreateNewUserMutation, useUpdateUserMutation} from "../../services/user";
import {getNameAddressByCode} from "../../utils/help";
import MyButton from "../Elements/Button/MyButton";

const ModalAccount = ({isShowing, hide, rowData, setIsCreating, infoCustomer, showModalAddress, setRowDataAddress}) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset
	} = useForm();
	const [selectedAddress, setSelectedAddress] = useState({});
	const [updateUser] = useUpdateUserMutation();

	const handleRadioChange = (address) => {
		setSelectedAddress(address);
	};

	const handleUpdateAddressInModal = (address) => {
		setRowDataAddress(address);
		showModalAddress();
		hide();
	};

	const handleCreateAddressInModal = () => {
		setIsCreating(true);
		showModalAddress();
		hide();
	};

	const onSubmit = async () => {
		if(infoCustomer) {
			const spreadInfoCustomer = infoCustomer[0];
			await updateUser ({
				...spreadInfoCustomer,
				address_Id: selectedAddress._id
			});
			hide();
		}
	};

	return (
		<MyModal
			isShowing={isShowing}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			handleHideModal={hide}
			title={"Cập nhật"}
		>
			<div className="flex justify-between text-gray-600 text-lg">
				<span>Địa chỉ nhận hàng</span>
			</div>
			<div className="max-h-[500px] overflow-auto no-scrollbar box-border py-4">
				{rowData?.map((address, key) =>
						<div key={key} className="flex items-center border-b">
							<input
								type="radio"
								value={address}
								checked={selectedAddress._id === address._id}
								onChange={() => handleRadioChange({...address})}
							/>
							<div className="rounded-md p-2 mb-4">
								<header className="flex-1 flex justify-between items-center">
									<div className="flex items-center whitespace-nowrap">
										<span className="text-base mr-1">{address.name}</span>
										<span className="border-l h-4 mx-2"></span>
										<span className="text-gray-600">{address.phone}</span>
										{key === 0 && <span className="text-sm text-gray-500 ml-4">Địa chỉ cá nhân</span>}
									</div>
									{key !== 0 && (
										<button onClick={() => handleUpdateAddressInModal(address)} className="ml-2 text-blue-500 w-20">
											Cập nhật
										</button>
									)}
								</header>
								<div className="text-gray-600">
									<p>{address.detail}</p>
									<span className="mr-2">{getNameAddressByCode(address.districts, dataDistricts)}</span>
									<span>{getNameAddressByCode(address.city, dataCities)}</span>
								</div>
							</div>
					</div>
			)}
				<MyButton onClick={handleCreateAddressInModal} styleModify={"p-2 border border-primary text-primary"}>
					<i className="bi bi-geo-alt-fill mr-2"></i>
					Thêm địa chỉ
				</MyButton>
			</div>
		</MyModal>
	);
};

export default ModalAccount;
