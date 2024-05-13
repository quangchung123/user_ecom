import React, {useEffect, useState} from 'react';
import MyModal from "./MyModal";
import FormField from "../Elements/Form/FormField";
import {useForm} from "react-hook-form";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
import {useCreateNewAddressMutation} from "../../services/address";

const ModalAddress = ({isShowing, hide, rowData, isCreating}) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		reset
	} = useForm({
		defaultValues: rowData
	});
	const formData= watch();
	const {city} = formData;
	const [dataDistrictsFilter, setDataDistrictsFilter] = useState(dataDistricts);
	const [createNewAddress] = useCreateNewAddressMutation();
	useEffect(() => {
		setDataDistrictsFilter(dataDistricts.filter((district) => district.parent_code === city))
	}, [city]);

	useEffect(() => {
		if(rowData) {
			reset(rowData)
		}
	}, [rowData]);
	const onSubmit = async (payload) => {
		await createNewAddress(payload);
		hide()
	}
	return (
		<MyModal
			isShowing={isShowing}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			handleHideModal={hide}
			isCreating={isCreating}
		>
			<FormField
				control={control}
				errors={errors}
				name={"name"}
				placeholder={"Nhập họ và tên"}
				label={"Họ & Tên"}
			/>
			<FormField
				control={control}
				errors={errors}
				name={"phone"}
				placeholder={"Nhập số điện thoại"}
				label={"Số điện thoại"}
			/>
			<FormField
				control={control}
				errors={errors}
				name={"city"}
				label={"Thành phố/tỉnh"}
				inputType={"select"}
				options={dataCities}
				typeSelect={"selectCities"}
			/>
			<FormField
				control={control}
				errors={errors}
				name={"districts"}
				label={"Quận/huyện"}
				inputType={"select"}
				options={dataDistrictsFilter}
			/>
			<FormField
				control={control}
				errors={errors}
				name={"detail"}
				label={"Địa chỉ"}
				placeholder={"Nhập địa chỉ"}
				inputType={"textarea"}
			/>
		</MyModal>
	);
};

export default ModalAddress;