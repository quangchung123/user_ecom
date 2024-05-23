import React, {useEffect, useState} from 'react';
import MyModal from "./MyModal";
import FormField from "../Elements/Form/FormField";
import {useForm} from "react-hook-form";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
import {useCreateNewAddressMutation, useUpdateAddressMutation} from "../../services/address";
import {initStateAddress} from "../../config";
import {useId} from "../../hooks/useId";
import {useSelector} from "react-redux";
import {getDataInPersistStore, notify} from "../../utils/help";
import {PERSIT_KEY} from "../../config/constant";


const ModalAddress = ({isShowing, hide, rowData, isCreating, showModalAccount}) => {
	console.log("isShowing", isShowing)
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		reset,
	} = useForm({
		defaultValues: isCreating ? {...initStateAddress} : rowData
	});
	const formData= watch();
	const {city} = formData;
	const [dataDistrictsFilter, setDataDistrictsFilter] = useState(dataDistricts);
	const [createNewAddress] = useCreateNewAddressMutation();
	const [updateAddress]= useUpdateAddressMutation();
	const customerIdStoreRedux = useSelector((state) => state.userAccount);
	const dataCustomer = getDataInPersistStore(customerIdStoreRedux, PERSIT_KEY.USER_ACCOUNT);
	const onSubmit = async (data) => {
		const payload = {
			...data,
			customer_id: dataCustomer.user.customerId
		}
		try {
			if (isCreating) {
				await createNewAddress(payload);
				notify("Tạo mới thành công")
			} else {
				await updateAddress(payload);
				notify("Cập nhật thành công")
			}
			reset()
			showModalAccount();
			console.log("hide", hide())
		} catch (err) {
			console.log(err);
		}
		hide()
	}
	useEffect(() => {
		setDataDistrictsFilter(dataDistricts.filter((district) => district.parent_code === city))
	}, [city]);
	useEffect(() => {
		if (isCreating) {
			reset({ ...initStateAddress });
		} else {
			reset(rowData);
		}
	}, [isCreating, rowData]);

	return (
		<MyModal
			isShowing={isShowing}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			handleHideModal={hide}
			isCreating={isCreating}
			reset={reset}
			title={"Cập nhật"}
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