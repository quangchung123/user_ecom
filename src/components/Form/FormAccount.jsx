import React, {useEffect, useMemo, useState} from 'react';
import FormField from "../Elements/Form/FormField";
import { useForm } from "react-hook-form";
import MyButton from "../Elements/Button/MyButton";
import { useSelector } from "react-redux";
import {getDataInPersistStore, handleLoadDataFromStorage, notifyConfirm} from "../../utils/help";
import {LOCAL_STORAGE_KEY, PERSIT_KEY} from "../../config/constant";
import {useGetDetailUserQuery, useUpdateUserMutation} from "../../services/user";
import dataCities from "../../config/address/cities.json";
import dataDistricts from "../../config/address/districts.json";
import styles from "./FormAccount.module.scss"
import {useId} from "../../hooks/useId";

const FormAccount = () => {
	const customerIdStoreRedux = useSelector((state) => state.userAccount);
	const dataCustomer = getDataInPersistStore(customerIdStoreRedux, PERSIT_KEY.USER_ACCOUNT);
	const { data } = useGetDetailUserQuery(dataCustomer.user.customerId);
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
	const {city} = formData;
	const onsubmit = async (payload) =>{
		await updateUser(payload)
		notifyConfirm("Cập nhật thành công")
	}
	useEffect(() => {
		if (data) {
			reset(data)
		}
	}, [data]);
	useEffect(() => {
		setDataDistrictsFilter(dataDistricts.filter((district) => district.parent_code === city))
	}, [city]);
	
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
