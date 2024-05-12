import React, {useEffect, useMemo, useState} from 'react';
import FormField from "../Elements/Form/FormField";
import { useForm } from "react-hook-form";
import MyButton from "../Elements/Button/MyButton";
import { useSelector } from "react-redux";
import { handleLoadDataFromStorage } from "../../utils/help";
import { LOCAL_STORAGE_KEY } from "../../config/constant";
import {useGetDetailUserQuery, useUpdateUserMutation} from "../../services/user";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
import styles from "./FormAccount.module.scss"
import {useCreateNewAddressMutation, useGetAddressQuery} from "../../services/address";

const FormAddress = () => {
	const { data } = useGetAddressQuery();
	const [dataDistrictsFilter, setDataDistrictsFilter] = useState(dataDistricts);
	const [createNewAddress] = useCreateNewAddressMutation();
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		getValues,
		watch
	} = useForm({
		defaultValues: data
	});

	const formData= watch();
	const {city} = formData;
	useEffect(() => {
		if (data) {
			reset(data)
		}
	}, [data]);
	useEffect(() => {
		setDataDistrictsFilter(dataDistricts.filter((district) => district.parent_code === city))
		console.log(dataDistrictsFilter)
	}, [data, city]);
	const onsubmit = async (payload) =>{
		await createNewAddress(payload)
	}
	return (
		<div className={styles.containerForm}>
			<form onSubmit={handleSubmit(onsubmit)}>
				<div className="border-b pb-4">
					<h2>Thông tin người nhận</h2>
					<FormField
						control={control}
						errors={errors}
						name={"name"}
						placeholder={"Nhập tên"}
						label={"Tên người nhân"}
					/>
					<FormField
						control={control}
						errors={errors}
						name={"phone"}
						placeholder={"Nhập số điện thoại"}
						label={"Số điện thoại"}
					/>
				</div>
				<div>
					<h2>Địa chỉ nhận hàng</h2>
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
						placeholder={"Nhập địa chỉ nhà hoặc công ty"}
						inputType={"textarea"}
					/>
				</div>
				<MyButton type="submit" styleModify={"py-2.5 px-16 rounded bg-primary text-white"}>
					Cập nhật
				</MyButton>
			</form>
		</div>
	);
};

export default FormAddress;
