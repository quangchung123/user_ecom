import React, {useEffect, useState} from 'react';
import MyModal from "./MyModal";
import FormField from "../Elements/Form/FormField";
import {useForm} from "react-hook-form";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
import {useSelector} from "react-redux";
import {useUpdateUserMutation} from "../../services/user";

const ModalAccount = ({isShowing, hide, rowData}) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset
	} = useForm({
		defaultValues: rowData
	});
	const [dataDistrictsFilter, setDataDistrictsFilter] = useState(dataDistricts);
	const citySelectedByCode = useSelector((state) => state.citySelected.cities.code);
	const [updateUser] = useUpdateUserMutation();
	useEffect(() => {
		setDataDistrictsFilter(dataDistricts.filter((district) => district.parent_code === citySelectedByCode))
	}, [citySelectedByCode]);

	useEffect(() => {
		if(rowData) {
			reset(rowData)
		}
	}, [rowData]);
	const onSubmit = async (payload) => {
		await updateUser(payload);
		hide()
	}
	return (
		<MyModal isShowing={isShowing} handleSubmit={handleSubmit} onSubmit={onSubmit} handleHideModal={hide}>
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
			/>
		</MyModal>
	);
};

export default ModalAccount;