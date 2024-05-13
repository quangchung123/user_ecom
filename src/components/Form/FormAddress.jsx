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
import ModalAddress from "../Modal/ModalAddress";
import useModal from "../../hooks/useModal";

const FormAddress = () => {
	const { data } = useGetAddressQuery();
	const [dataDistrictsFilter, setDataDistrictsFilter] = useState(dataDistricts);
	const [isCreating, setIsCreating] = useState(false);
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
	const { isShowing, toggle } = useModal();
	const handleCreateNew = () => {
		toggle();
		setIsCreating(true);
	}

	return (
		<div className={styles.containerForm}>
			<div>
				<span>Địa chỉ của tôi</span>
				<MyButton onClick={handleCreateNew}>
					Create New
				</MyButton>
			</div>
			<ModalAddress
				isShowing={isShowing}
				hide={toggle}
				rowData={data}
				isCreating={isCreating}
			/>
		</div>
	);
};

export default FormAddress;
