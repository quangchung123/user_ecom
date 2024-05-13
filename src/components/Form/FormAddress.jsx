import React, { useEffect, useState } from 'react';
import MyButton from "../Elements/Button/MyButton";
import { useGetAddressQuery, useUpdateAddressMutation } from "../../services/address";
import ModalAddress from "../Modal/ModalAddress";
import useModal from "../../hooks/useModal";
import {getNameAddressByCode} from "../../utils/help";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
const FormAddress = () => {
	const { data } = useGetAddressQuery();
	const [isCreating, setIsCreating] = useState(false);
	const { isShowing, toggle } = useModal();
	const [rowData, setRowData] = useState(null);
	const [updateAddress] = useUpdateAddressMutation();
	const [defaultAddress, setDefaultAddress] = useState(null);

	useEffect(() => {
		if (data) {
			const defaultAddressIndex = data.findIndex(address => address.isDefault);
			if (defaultAddressIndex !== -1) {
				setDefaultAddress(data[defaultAddressIndex]);
			}
		}
	}, [data]);

	const handleCreateNewAddress = () => {
		toggle();
		setIsCreating(true);
	}

	const handleUpdateAddress = (payload) => {
		setRowData(payload);
		setIsCreating(false);
		toggle();
	}

	const handleSetDefault = async (addressId, data) => {
		let payload;
		if (defaultAddress?._id === addressId) {
			payload = {
				...data,
				type: "default"
			};
		} else {
			const { type, ...rest } = data;
			payload = { ...rest };
		}
		await updateAddress(payload);
		setDefaultAddress(data);
	}

	return (
		<div className="box-border p-4">
			<div className="flex justify-between items-center mb-4 ">
				<span className="text-xl font-bold">Địa chỉ nhận hàng</span>
				<MyButton onClick={handleCreateNewAddress} styleModify={"px-4 py-2 bg-primary text-white rounded hover:opacity-85"}>
					Tạo Mới
				</MyButton>
			</div>
			{data?.map((address, key) =>
				<div key={key} className="border rounded-md p-4 mb-4">
					<div>
						<span className="text-lg font-semibold mr-2">{address.name}</span>
						<span className="text-gray-600">{address.phone}</span>
						<p className="mt-2">{address.detail}</p>
						<span className="mr-2">{getNameAddressByCode(address.districts, dataDistricts)}</span>
						<span>{getNameAddressByCode(address.city, dataCities)}</span>
					</div>
					<div className="flex justify-end mt-2">
						<button onClick={() => handleUpdateAddress(address)} className="px-3 py-2 bg-primary text-white rounded-md hover:opacity-85 mr-4">
							Cập nhật
						</button>
						{defaultAddress && defaultAddress._id === address._id ? (
							<span className="text-green-500 font-bold">Địa chỉ mặc định</span>
						) : (
							<button onClick={() => handleSetDefault(address._id, address)} className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
								Đặt Mặc Định
							</button>
						)}
					</div>
				</div>
			)}
			<ModalAddress
				isShowing={isShowing}
				hide={toggle}
				rowData={rowData}
				isCreating={isCreating}
			/>
		</div>
	);
};

export default FormAddress;
