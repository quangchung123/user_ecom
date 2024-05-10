import React, {useEffect, useState} from 'react';
import {useGetListProductSelectedQuery} from "../../../services/productSelected";
import {useSelector} from "react-redux";
import ModalAccount from "../../../components/Modal/ModalAccount";
import useModal from "../../../hooks/useModal";
import {handleLoadDataFromStorage} from "../../../utils/help";
import {LOCAL_STORAGE_KEY, STATUS_ORDER} from "../../../config/constant";
import {useGetDetailUserQuery} from "../../../services/user";
import {useCreateNewOrderMutation} from "../../../services/order";
import {useParams} from "react-router-dom";

const CheckoutProduct = () => {
	const {productSelectedId} = useParams();
	const {data: productSelected} = useGetListProductSelectedQuery(productSelectedId);
	const { isShowing, toggle } = useModal();
	const customerIdStoreRedux = useSelector((state) => state.userAccount.user.customerId);
	const storedUser = customerIdStoreRedux ? handleLoadDataFromStorage(LOCAL_STORAGE_KEY.PERSIST_STORE).userAccount : null;
	const parsedPersistedData = JSON.parse(storedUser);
	const customer_id = customerIdStoreRedux || (parsedPersistedData && parsedPersistedData.user.customerId);
	const { data: InfoCustomer } = useGetDetailUserQuery(customer_id);
	const [createNewOrder] = useCreateNewOrderMutation();
	const handleSubmitOrder = async () => {
		try {
			const payload = {
				products: productSelected,
				customerId: customer_id,
				totalPrice: productSelected?.totalPriceSelected,
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
					<span>{InfoCustomer?.name}</span>
					<span>{InfoCustomer?.phone}</span>
				</div>
				<p>{InfoCustomer?.detail}, {InfoCustomer?.districts}, {InfoCustomer?.city}</p>
			</div>
			<div>
				<span>Tổng tiền {productSelected?.totalPriceSelected}</span>
				<div>
					<span>Số tiền {productSelected?.totalPriceSelected}</span>
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
				Đặt hàng
			</button>
			<ModalAccount
				isShowing={isShowing}
				hide={toggle}
				rowData={InfoCustomer}
			/>
		</div>
	);
};

export default CheckoutProduct;