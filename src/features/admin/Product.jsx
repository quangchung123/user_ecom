import React, {useEffect, useState} from 'react';
import { useDeleteProductMutation, useGetListProductQuery } from "../../services/product";
import TableList from "../../components/Table/TableList";
import { columnProduct } from "../../config";
import useModal from "../../hooks/useModal";
import ModalProduct from "../../components/Modal/ModalProduct";
import { useGetListCategoriesQuery } from "../../services/categories";
import MyButton from "../../components/Elements/Button/MyButton";
import styles from "./Admin.module.scss";
import {useNavigate} from "react-router-dom";
import {ROUTER_ADMIN, ROUTER_INIT} from "../../config/constant";
import InputSearch from "../../components/Elements/Search/InputSearch";

const Product = () => {
		const { data: productList } = useGetListProductQuery();
		const { data: categoryList } = useGetListCategoriesQuery();
		const { isShowing, toggle } = useModal();
		const [deleteProduct] = useDeleteProductMutation();
		const [selectedRowData, setSelectedRowData] = useState({});
		const [isCreating, setIsCreating] = useState(false);
		const [valueSelectOption, setValueSelectOption] = useState('');
		const [productOfCategories, setProductOfCategories] = useState(productList);
		const navigate = useNavigate();
		const [valueInput, setValueInput] = useState('');
		useEffect(() => {
				let filteredProducts = productList;
				if (valueSelectOption && valueSelectOption !== "All category") {
						filteredProducts = productList?.filter((products) => products.categories === valueSelectOption);
				}
				const dataFiltered = filteredProducts?.filter((item) => item.name.toLowerCase().includes(valueInput.toLowerCase()));
				setProductOfCategories(dataFiltered);
		}, [valueSelectOption, productList, valueInput]);
		
		const handleUpdateRow = (index) => {
				const dataSelected = productList.find((dataRow) => dataRow._id === index);
				const dataSelectedAddId = {
						...dataSelected,
						_id: index
				};
				setSelectedRowData(dataSelectedAddId);
				toggle();
				setIsCreating(false);
		};
		const handleCreateNew = () => {
				toggle();
				setIsCreating(true);
		};
		const handleDeleteRow = (index) => {
				deleteProduct(index);
		};
		const handleSelect = (event) => {
				setValueSelectOption(event.target.value);
		}
		const handleGoToDetailPage = (index) => {
				navigate(`${ROUTER_INIT.ADMIN}/${ROUTER_ADMIN.PRODUCT}/${index}`)
		}
		
		const listActionIconProduct = [
				{
						key: 1,
						title: 'Edit',
						handleRowAction: handleUpdateRow
				},
				{
						key: 2,
						title: 'Detail',
						handleRowAction: handleGoToDetailPage
				},
				{
						key: 3,
						title: 'Delete',
						handleRowAction: handleDeleteRow
				},
		];
		
		return (
				<div className={styles.container}>
						<div className={styles.header}>
								<h2 className={styles.headerTitle}>Products</h2>
								<MyButton onClick={handleCreateNew} styleModify={styles.headerBtn}>
										Create New
								</MyButton>
						</div>
						<div className={styles.content}>
								<header>
										<InputSearch setValueInput={setValueInput} />
										<select onChange={handleSelect}>
										<option>All category</option>
										{categoryList && categoryList.map(category => (
												<option key={category._id}>{category.title}</option>
										))}
										</select>
								</header>
								<TableList
										dataTable={productOfCategories}
										columnTable={columnProduct}
										listIconButton={listActionIconProduct}
								/>
								<ModalProduct
										isShowing={isShowing}
										hide={toggle}
										isCreating={isCreating}
										rowData={selectedRowData}
										categoryList={categoryList}
								/>
						</div>
				</div>
		);
};

export default Product;
