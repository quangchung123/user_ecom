const TableDetail = ({ dataDetail, columnDetail }) => {
		return (
				<div className="box-border p-2.5">
						<table>
								<tbody>
								{
										columnDetail?.map((item, index) => (
												<tr>
														<th className="w-1/3">{item.label}</th>
														<td>{dataDetail? dataDetail[item.key] : ""}</td>
												</tr>
										))
								}
								</tbody>
						</table>
				</div>
		);
};

export default TableDetail;
