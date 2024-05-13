import React, {useEffect, useState} from 'react';
import MyModal from "./MyModal";
import FormField from "../Elements/Form/FormField";
import {useForm} from "react-hook-form";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
import {useSelector} from "react-redux";
import {useUpdateUserMutation} from "../../services/user";
import {getNameAddressByCode} from "../../utils/help";
const ModalAccount = ({isShowing, hide, rowData, setAddress}) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset
	} = useForm();
	const [selectedAddress, setSelectedAddress] = useState({});
	const handleRadioChange = (address) => {
		setSelectedAddress(address)
	};
	const onSubmit = () => {
		setAddress(selectedAddress);
		hide();
	}
	return (
		<MyModal
			isShowing={isShowing}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			handleHideModal={hide}
			title={"Cập nhật"}
		>
			{rowData?.map((address, key) =>
				<div key={key} className="flex items-center">
					<input
						type="radio"
						value={address}
						checked={selectedAddress._id === address._id}
						onChange={() => handleRadioChange({...address})}
					/>
					<div className="border rounded-md p-4 mb-4">
						<div>
							<span className="text-lg font-semibold mr-2">{address.name}</span>
							<span className="text-gray-600">{address.phone}</span>
							<p className="mt-2">{address.detail}</p>
							<span className="mr-2">{getNameAddressByCode(address.districts, dataDistricts)}</span>
							<span>{getNameAddressByCode(address.city, dataCities)}</span>
						</div>
					</div>
				</div>
			)}
		</MyModal>
	);
};

export default ModalAccount;