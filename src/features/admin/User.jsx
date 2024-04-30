import React, {useEffect, useState} from 'react';
import TableList from "../../components/Table/TableList";
import {columnUser, tabsUser} from "../../config";
import useModal from "../../hooks/useModal";
import {useDeleteUserMutation, useGetListUserQuery} from "../../services/user";
import styles from "./Admin.module.scss";
import MyButton from "../../components/Elements/Button/MyButton";
import ModalUser from "../../components/Modal/ModalUser";
import MyTabs from "../../components/Elements/Tabs/MyTabs";
import InputSearch from "../../components/Elements/Search/InputSearch";

const User = () => {
		const { data } = useGetListUserQuery();
		const { isShowing, toggle } = useModal();
		const [deleteUser] = useDeleteUserMutation();
		const [selectedRowData, setSelectedRowData] = useState([]);
		const [isCreating, setIsCreating] = useState(false);
		const [tabSelected, setTabSelected] = useState('Admin');
		const [dataUserTitle, setDataUserTitle] = useState(data);
		const [valueInput, setValueInput] = useState('');
		
		useEffect(() => {
				const filterDataUser = data?.filter((item) => item.title === tabSelected);
				const dataFiltered = filterDataUser?.filter((item) => item.name.toLowerCase().includes(valueInput.toLowerCase()));
				setDataUserTitle(dataFiltered);
		}, [tabSelected, data, valueInput]);
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
				deleteUser(index);
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
								<h2 className={styles.headerTitle}>User</h2>
								<MyButton onClick={handleCreateNew} styleModify={styles.headerBtn}>
										Create New
								</MyButton>
						</div>
						<div className={styles.content}>
								<header>
										<InputSearch setValueInput={setValueInput} />
								</header>
								<MyTabs tabs={tabsUser} setTabSelected={setTabSelected} tabSelected={tabSelected}/>
								<TableList dataTable={dataUserTitle} columnTable={columnUser} listIconButton={listActionIconProduct} />
								<ModalUser
										isShowing={isShowing}
										hide={toggle}
										isCreating={isCreating}
										rowData={selectedRowData}
								/>
						</div>
				</div>
		);
};

export default User;
