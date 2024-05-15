import React from 'react';
import {useSelector} from "react-redux";
import {STATUS_ORDER} from "../../../config/constant";
import {useGetDetailUserQuery} from "../../../services/user";
import useModal from "../../../hooks/useModal";
import ModalAccount from "../../../components/Modal/ModalAccount";
import {useCreateNewOrderMutation} from "../../../services/order";
import {useId} from "../../../hooks/useId";

const OrderProduct = ({totalPriceSelected, dataSelected}) => {
	const { isShowing, toggle } = useModal();
	const customer_id = useId();
	const { data } = useGetDetailUserQuery(customer_id);
	const [createNewOrder] = useCreateNewOrderMutation();
	const handleSubmitOrder = async () => {
		try {
			const payload = {
				customer_id: customer_id,
				dataProduct: dataSelected,
				totalPrice: totalPriceSelected,
				payment: "COD",
				status: STATUS_ORDER.PROCESSING
			}
			await createNewOrder(payload)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className="w-1/4 border rounded-lg shadow-xl">
			<div>
				<div className="flex justify-between">
					<span>Giao tới</span>
					<button onClick={toggle}>Thay đổi</button>
				</div>
				<div className="flex">
					<span>{data?.name}</span>
					<span>{data?.phone}</span>
				</div>
				<p>{data?.detail}, {data?.districts}, {data?.city}</p>
			</div>
			<div>
				<span>Tổng tiền {totalPriceSelected}</span>
				<div>
					<span>Số tiền {totalPriceSelected}</span>
					<span>(Đã bao gồm VAT nếu có)</span>
				</div>
			</div>
			<div>
				<div className="flex">
					<span>Phương thức thanh toán</span>
					<span>Thay đổi</span>
				</div>
				<span>Thanh toán khi nhận hàng</span>
			</div>
			<button onClick={handleSubmitOrder}>
				Mua hàng ({dataSelected.length} sản phẩm)
			</button>
			<ModalAccount
				isShowing={isShowing}
				hide={toggle}
				rowData={data}
			/>
		</div>
	);
};

export default OrderProduct;