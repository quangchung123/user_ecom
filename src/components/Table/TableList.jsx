import React, {useMemo, useState} from 'react';
import IconActions from "../Elements/Icon/IconAction";
import Pagination from "../Elements/Pagination/MyPagination";
import {CURRENT_PAGE, RECORD_INIT} from "../../config/constant";
import {getDataOnPage} from "../../utils/help";
import MenuAction from "../Elements/MenuActions/MenuAction";

const TableList = ({ dataTable, columnTable, listIconButton }) => {
		const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
		const recordsPerPage = RECORD_INIT;
		const totalPage = Math.ceil(dataTable?.length / recordsPerPage);
		const dataList = useMemo(() => (getDataOnPage(currentPage, dataTable, recordsPerPage)), [currentPage, dataTable]);
		const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);
		return (
				<div className="box-border p-2.5">
						<table>
								<thead>
								<tr>
										{columnTable.map((column) => (
												<th key={column.key} className="">{column.label}</th>
										))}
								</tr>
								</thead>
								<tbody>
								{dataList?.map((value, index) => (
										<tr key={index}>
												{columnTable?.map((column, rowIndex) => (
														<td key={rowIndex} className="border py-2 px-4">
																{column.key === 'image' ? (
																		<img src={value[column.key]} alt="Product" className="w-16 h-auto" />
																) : column.key === 'action' ? (
																		<MenuAction value={value} data={listIconButton} />
																): value[column.key]}
														</td>
												))}
										</tr>
								))}
								</tbody>
						</table>
						<Pagination
								setCurrentPage={setCurrentPage}
								pageNumbers={pageNumbers}
								currentPage={currentPage}
								totalPage={totalPage}
						/>
				</div>
		);
};

export default TableList;
