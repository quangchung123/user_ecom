import React, {useEffect, useState} from 'react';
import {tabsOrder} from "../../../config";
import MyTabs from "../../../components/Elements/Tabs/MyTabs";
import {useGetListOrderQuery} from "../../../services/order";
import {useId} from "../../../hooks/useId";
import {convertToVietnameseDong} from "../../../utils/help";

const OrderProduct = () => {
	const {data} = useGetListOrderQuery();
	const id = useId();
	const [tabSelected, setTabSelected] = useState('Đang xử lý');
	const dataFilterById = data?.filter((dataOrder) => dataOrder.customer_id === id);
	const [dataFilterByTabName, setDataFilterByTabName] = useState([]);
	console.log(dataFilterByTabName)
	useEffect(() => {
		setDataFilterByTabName(dataFilterById?.filter((data) => data.status === tabSelected))
	}, [tabSelected, data]);
	return (
		<div className="flex items-center justify-center box-border py-12">
			<div className="w-2/3 min-h-screen bg-white">
				<MyTabs tabs={tabsOrder} setTabSelected={setTabSelected} tabSelected={tabSelected} />
				<div>
					{dataFilterByTabName?.map((dataItem) => (
						dataItem.products.dataProduct?.map((product) => (
							<div key={product._id} className="rounded  mb-3 flex items-center justify-between box-border px-4 py-2.5 bg-white">
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
						))
					))}
				</div>
			</div>
		</div>
	);
};

export default OrderProduct;