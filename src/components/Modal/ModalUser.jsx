import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import FormField from "../Elements/Form/FormField";
import {useCreateNewUserMutation, useUpdateUserMutation} from "../../services/user";
import MyModal from "./MyModal";
import {initStateUser, titleNameList} from "../../config";

const ModalUser = ({ isShowing, hide, rowData, isCreating }) => {
		const { _id } = rowData;
		const {
				handleSubmit,
				control,
				formState: { errors }, reset
		} = useForm({
				defaultValues: isCreating ? { ...initStateUser } : rowData
		});
		useEffect(() => {
				if (!isCreating && Object.keys(rowData).length > 0) {
						reset(rowData);
				}
		}, [rowData, isCreating]);
		const [createNewUser] = useCreateNewUserMutation();
		const [updateUser] = useUpdateUserMutation();
		const onSubmit = async (data) => {
				try {
						if (isCreating) {
								await createNewUser(data);
						}
						else {
								const payload = {
										...data,
										_id: _id
								};
								await updateUser(payload);
						}
						handleHideModal();
				} catch (err) {
						console.log(err);
				}
		}
		const handleHideModal = () => {
				hide();
				reset(initStateUser);
		}
		
		return (
				<MyModal isShowing={isShowing} handleSubmit={handleSubmit} onSubmit={onSubmit} handleHideModal={handleHideModal} isCreating={isCreating}>
						<FormField
								control={control}
								errors={errors}
								name={"name"}
								placeholder={"Enter Name"}
								label={"Name"}
						/>
						<FormField
								control={control}
								errors={errors}
								name={"username"}
								placeholder={"Enter Username"}
								label={"Username"}
						/>
						<FormField
								control={control}
								errors={errors}
								name={"password"}
								placeholder={"Enter Password"}
								label={"Password"}
						/>
						<FormField
								control={control}
								errors={errors}
								name={"title"}
								placeholder={"Enter Title"}
								label={"Title"}
								inputType={"select"}
								options={titleNameList}
						/>
				</MyModal>
		);
}

export default ModalUser;
