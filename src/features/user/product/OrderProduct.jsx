import React, {useEffect, useState} from 'react';
import {tabsOrder} from "../../../config";
import MyTabs from "../../../components/Elements/Tabs/MyTabs";
import {useGetListOrderQuery} from "../../../services/order";
import {useId} from "../../../hooks/useId";
import {convertToVietnameseDong, getDataInPersistStore} from "../../../utils/help";
import {useSelector} from "react-redux";
import {PERSIT_KEY} from "../../../config/constant";

const OrderProduct = () => {
	const {data} = useGetListOrderQuery();
	const customerIdStoreRedux = useSelector((state) => state.userAccount);
	const dataCustomer = getDataInPersistStore(customerIdStoreRedux, PERSIT_KEY.USER_ACCOUNT);
	const [tabSelected, setTabSelected] = useState('Đang xử lý');
	const dataFilterById = data?.filter((dataOrder) => dataOrder.customer_id === dataCustomer.user.customerId);
	const [dataFilterByTabName, setDataFilterByTabName] = useState([]);
	useEffect(() => {
		setDataFilterByTabName(dataFilterById?.filter((data) => data.status === tabSelected))
	}, [tabSelected, data]);

	return (
		<div className="flex items-center justify-center">
			<div className="w-2/3 min-h-screen">
				<div className="bg-white mb-3">
					<MyTabs tabs={tabsOrder} setTabSelected={setTabSelected} tabSelected={tabSelected} />
				</div>
				{dataFilterByTabName?.map((dataItem) => (
					<div className="bg-white mt-3">
						<div className="border-b-2 h-12 items-center flex justify-end space-x-2 mx-2">
							<span className="text-base text-[#26aa99] mr-7">
								<i className="bi bi-truck mr-2"></i>
								{dataItem.shipping}
							</span>
						</div>
						<div className="rounded mb-3 flex flex-col justify-between box-border px-4 py-2.5 border-b">
							<div className="flex justify-between mb-3 border-b pb-3.5">
								<label className="w-5/12">
									<span>Sản phẩm</span>
								</label>
								<span className="w-1/6">Số lượng</span>
								<span className="w-1/6">Tổng tiền</span>
							</div>
							<div className="space-y-3">
								{dataItem.products?.dataProduct?.map((product) => (
									<div key={product._id} className="flex justify-between items-center">
										<label className="flex items-center w-5/12">
											<img src={product.image} className="h-[110px] w-[110px] ml-4" alt="image product" />
											<div className="flex flex-col">
												<span className="font-semibold">{product.name}</span>
												<span className="text-sm opacity-85 mt-2.5">Kích cỡ {product.size}</span>
											</div>
										</label>
										<span className="w-1/6">{product.quantity}</span>
										<span className="w-1/6 text-second">{convertToVietnameseDong(product.totalPrice)}</span>
									</div>
								))}
							</div>
						</div>
						<div className="h-20 flex flex-col items-end mx-2 mr-20 space-y-2">
							<div className="space-x-2">
								<span className="text-xl opacity-85">Thành tiền:</span>
								<span className="text-second text-lg">{convertToVietnameseDong(dataItem.totalPrice)}</span>
							</div>
							<div className="space-x-2 text-[#26aa99] text-base">
								<i className="bi bi-credit-card"></i>
								<span className="text-base">{dataItem.payment}</span>
							</div>
						</div>
					</div>
					))}
			</div>
		</div>
	);
};

export default OrderProduct;