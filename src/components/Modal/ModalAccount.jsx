import React, {useEffect, useState} from 'react';
import MyModal from "./MyModal";
import {useForm} from "react-hook-form";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
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
	const [selectedAddress, setSelectedAddress] = useState('');
	const [updateUser] = useUpdateUserMutation();
	const handleRadioChange = (id) => {
		setSelectedAddress(id);
	};
	const handleUpdateAddressInModal = (address) => {
		setRowDataAddress(address);
		showModalAddress();
		setIsCreating(false);
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
				address_Id: selectedAddress
			});
			hide();
		}
	};

	useEffect(() => {
		if(infoCustomer?.[0]) {
			setSelectedAddress(infoCustomer[0].address_Id)
		}
	}
		,[infoCustomer])
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
								checked={selectedAddress === address._id}
								onChange={() => handleRadioChange(address._id)}
							/>
							<div className="rounded-md p-2 mb-4">
								<header className="flex-1 flex justify-between items-center">
									<div className="flex items-center whitespace-nowrap">
										<span className="text-base mr-1">{address.name}</span>
										{key === 0 && <span className="text-sm text-gray-500 ml-4">Địa chỉ cá nhân</span>}
									</div>
									{key !== 0 && (
										<button onClick={() => handleUpdateAddressInModal(address)} className="ml-2 text-blue-500 w-20">
											Cập nhật
										</button>
									)}
								</header>
								<div className="text-gray-600">
									<div className="py-0">
										<span className="mr-3">Số điện thoại</span>
										<span className="text-gray-600">{address.phone}</span>
									</div>
									<div className="flex">
										<span className="mr-2.5">Địa chỉ</span>
										<p className="mr-1.5">{address.detail}</p>
										<span className="mr-1.5">{getNameAddressByCode(address.districts, dataDistricts)}</span>
										<span>{getNameAddressByCode(address.city, dataCities)}</span>
									</div>
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
