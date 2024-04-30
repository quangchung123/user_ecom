import React, { useState } from 'react';
import TableList from "../../components/Table/TableList";
import {columnCategories} from "../../config";
import useModal from "../../hooks/useModal";
import {useDeleteCategoriesMutation, useGetListCategoriesQuery} from "../../services/categories";
import ModalCategories from "../../components/Modal/ModalCategories";
import styles from "./Admin.module.scss";
import MyButton from "../../components/Elements/Button/MyButton";

const Categories = () => {
		const { data } = useGetListCategoriesQuery();
		const { isShowing, toggle } = useModal();
		const [deleteCategories] = useDeleteCategoriesMutation();
		const [selectedRowData, setSelectedRowData] = useState([]);
		const [isCreating, setIsCreating] = useState(false);
		const handleUpdateRow = (index) => {
				const dataSelected = data.find((dataRow) => dataRow._id === index);
				const dataSelectedAddId = {
						...dataSelected,
						_id: index
				}
				setSelectedRowData(dataSelectedAddId);
				toggle();
				setIsCreating(false);
		};
		const handleCreateNew = () => {
				toggle();
				setIsCreating(true);
		};
		const handleDeleteRow = (index) => {
				deleteCategories(index);
		};
		const listActionIconProduct = [
				{
						key: 1,
						title: 'Edit',
						handleRowAction: handleUpdateRow
				},
				{
						key: 2,
						title: 'Delete',
						handleRowAction: handleDeleteRow
				},
		];
		
		return (
				<div className={styles.container}>
						<div className={styles.header}>
								<h2 className={styles.headerTitle}>Category</h2>
								<MyButton onClick={handleCreateNew} styleModify={styles.headerBtn}>
										Create New
								</MyButton>
						</div>
						<div className={styles.content}>
								<TableList dataTable={data} columnTable={columnCategories} listIconButton={listActionIconProduct} />
								<ModalCategories
										isShowing={isShowing}
										hide={toggle}
										isCreating={isCreating}
										rowData={selectedRowData}
								/>
						</div>
				</div>
		);
};

export default Categories;
