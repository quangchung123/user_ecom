import React from 'react';
import FormField from "../Elements/Form/FormField";
import MyModal from "./MyModal";

const ModalLogin = () => {


	return (
		<MyModal isShowing={isShowing} handleSubmit={handleSubmit} onSubmit={onSubmit} handleHideModal={handleHideModal} isCreating={isCreating}>
			<FormField
				control={control}
				errors={errors}
				name={"title"}
				placeholder={"Enter Name"}
				label={"Title"}
			/>
			<FormField
				control={control}
				errors={errors}
				name={"description"}
				placeholder={"Enter Description"}
				label={"Description"}
				inputType={"textarea"}
			/>
		</MyModal>
	);
};

export default ModalLogin;