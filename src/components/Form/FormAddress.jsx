import React, { useEffect, useState } from 'react';
import MyButton from "../Elements/Button/MyButton";
import { useGetAddressQuery, useUpdateAddressMutation } from "../../services/address";
import ModalAddress from "../Modal/ModalAddress";
import useModal from "../../hooks/useModal";
import {getNameAddressByCode} from "../../utils/help";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
import {useId} from "../../hooks/useId";
const FormAddress = () => {
	const customer_id = useId();
	const { data } = useGetAddressQuery();
	const [isCreating, setIsCreating] = useState(false);
	const { isShowing, toggle } = useModal();
	const [rowData, setRowData] = useState(null);
	const dataFilter = data?.filter((item) => item.customer_id === customer_id);
	const handleCreateNewAddress = () => {
		toggle();
		setIsCreating(true);
	}
	const handleUpdateAddress = (payload) => {
		setRowData(payload);
		setIsCreating(false);
		toggle();
	}

	return (
		<div className="box-border p-4">
			<div className="flex justify-between items-center pb-4 border-b border-gray-300">
				<span className="text-xl font-semibold">Địa chỉ nhận hàng</span>
				<MyButton onClick={handleCreateNewAddress} styleModify={"px-6 py-2 bg-primary text-white rounded hover:opacity-85"}>
					Tạo Mới
				</MyButton>
			</div>
			{dataFilter?.map((address, key) =>
				<div key={key} className="border-b border-gray-300 py-3">
					<div>
						<span className="text-base mr-2">{address.name}</span>
						<span className="border-l-[1px] mr-2"></span>
						<span className="text-gray-600">{address.phone}</span>
					</div>
					<div className="text-npm gray-600">
						<p className="mt-2">{address.detail}</p>
						<span className="mr-2">{getNameAddressByCode(address.districts, dataDistricts)}</span>
						<span>{getNameAddressByCode(address.city, dataCities)}</span>
					</div>
					<div className="flex justify-end mt-1">
						<MyButton onClick={() => handleUpdateAddress(address)} styleModify={"px-3 py-2 bg-primary text-white rounded-md hover:opacity-85"}>
							Cập nhật
						</MyButton>
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
