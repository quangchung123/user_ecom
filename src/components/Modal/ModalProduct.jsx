import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import FormField from "../Elements/Form/FormField";
import { useCreateNewProductMutation, useUpdateProductMutation } from "../../services/product";
import MyModal from "./MyModal";
import {initStateProduct} from "../../config";

const ModalProduct = ({ isShowing, hide, rowData, isCreating, categoryList }) => {
		const { _id } = rowData;
		const {
				handleSubmit,
				control,
				formState: { errors },
				reset
		} = useForm({
				defaultValues: isCreating ? { ...initStateProduct } : rowData
		});
		const [createNewProduct] = useCreateNewProductMutation();
		const [updateProduct] = useUpdateProductMutation();
		
		useEffect(() => {
				if (!isCreating && Object.keys(rowData).length > 0) {
						reset(rowData);
				}
		}, [rowData, isCreating]);
		const onSubmit = async (data) => {
				try {
						if (isCreating) {
								await createNewProduct(data);
						} else {
								const payload = {
										...data,
										_id: _id
								};
								await updateProduct(payload);
						}
						handleHideModal();
				} catch (err) {
						console.log(err);
				}
		}
		
		const handleHideModal = () => {
				hide();
				reset(initStateProduct);
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
								name={"price"}
								placeholder={"Enter Price"}
								label={"Price"}
						/>
						<FormField
								control={control}
								errors={errors}
								name={"count"}
								placeholder={"Enter Count"}
								label={"Count"}
								type={"number"}
						/>
						<FormField
								control={control}
								errors={errors}
								name={"description"}
								placeholder={"Enter Description"}
								label={"Description"}
								inputType={"textarea"}
						/>
						<FormField
								control={control}
								errors={errors}
								name={"categories"}
								placeholder={"Enter Categories"}
								label={"Categories"}
								inputType={"select"}
								options={categoryList}
						/>
						<FormField
								control={control}
								errors={errors}
								name={"image"}
								placeholder={"Enter Image"}
								label={"Image"}
						/>
				</MyModal>
		);
}

export default ModalProduct;
