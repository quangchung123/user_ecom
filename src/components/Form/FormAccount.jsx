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

const FormAccount = () => {
	const customerIdStoreRedux = useSelector((state) => state.userAccount.user.customerId);
	const storedUser = customerIdStoreRedux ? handleLoadDataFromStorage(LOCAL_STORAGE_KEY.PERSIST_STORE).userAccount : null;
	const parsedPersistedData = JSON.parse(storedUser);
	const customer_id = customerIdStoreRedux || (parsedPersistedData && parsedPersistedData.user.customerId);
	const { data } = useGetDetailUserQuery(customer_id);
	const [dataDistrictsFilter, setDataDistrictsFilter] = useState(dataDistricts)
	const [updateUser] = useUpdateUserMutation();
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
	console.log(formData)
	const {city} = formData;
	useEffect(() => {
		if (data) {
			reset(data)
		}
	}, [data]);
	useEffect(() => {
		setDataDistrictsFilter(dataDistricts.filter((district) => district.parent_code === city))
	}, [city, data]);
	const onsubmit = async (payload) =>{
		console.log("payload", payload);
		await updateUser(payload)
	}
	return (
		<div className={styles.containerForm}>
			<form onSubmit={handleSubmit(onsubmit)}>
				<div className="border-b pb-4">
					<h2>Thông tin tài khoản</h2>
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
						name={"email"}
						placeholder={"Nhập Email"}
						label={"Email"}
						readonly={true}
					/>
				</div>
				<div>
					<h2>Địa chỉ cá nhân</h2>
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
				</div>
				<MyButton type="submit" styleModify={"py-2.5 px-16 rounded bg-primary text-white"}>
					Cập nhật
				</MyButton>
			</form>
		</div>
	);
};

export default FormAccount;
