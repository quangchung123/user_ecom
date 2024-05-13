import React, {useEffect, useState} from 'react';
import {useGetListProductSelectedQuery} from "../../../services/productSelected";
import {useSelector} from "react-redux";
import ModalAccount from "../../../components/Modal/ModalAccount";
import useModal from "../../../hooks/useModal";
import {convertToVietnameseDong, getNameAddressByCode, handleLoadDataFromStorage} from "../../../utils/help";
import {LOCAL_STORAGE_KEY, STATUS_ORDER} from "../../../config/constant";
import {useGetDetailUserQuery} from "../../../services/user";
import {useCreateNewOrderMutation} from "../../../services/order";
import {useParams} from "react-router-dom";
import styles from "../styles/Cart.module.scss";
import {useGetAddressQuery} from "../../../services/address";
import dataDistricts from "../../../config/address/districts.json";
import dataCities from "../../../config/address/cities.json";

const CheckoutProduct = () => {
	const {productSelectedId} = useParams();
	const {data: productSelected} = useGetListProductSelectedQuery(productSelectedId);
	const { isShowing, toggle } = useModal();
	const customerIdStoreRedux = useSelector((state) => state.userAccount.user.customerId);
	const storedUser = customerIdStoreRedux ? handleLoadDataFromStorage(LOCAL_STORAGE_KEY.PERSIST_STORE).userAccount : null;
	const parsedPersistedData = JSON.parse(storedUser);
	const customer_id = customerIdStoreRedux || (parsedPersistedData && parsedPersistedData.user.customerId);
	const { data: infoAddress } = useGetAddressQuery();
	const [createNewOrder] = useCreateNewOrderMutation();
	const [address, setAddress] = useState({});
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
		<div className={styles.container}>
			<div className={styles.containerCart}>
				<div className="flex flex-col border rounded box-border p-3.5 bg-white shadow">
					<div className="flex justify-between items-center">
						<span className="font-bold">Địa chỉ nhận hàng</span>
						<button onClick={toggle} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Chọn địa chỉ</button>
					</div>
					<div className="mt-4">
						<div className="mb-2">
							<span className="font-semibold mr-3 italic opacity-65">Tên người nhận:</span>
							<span>{address.name}</span>
						</div>
						<div className="mb-2">
							<span className="font-semibold mr-3 italic opacity-65">Số điện thoại:</span>
							<span>{address.phone}</span>
						</div>
						<div className="mb-2 flex items-center">
							<span className="font-semibold mr-3 italic opacity-65">Địa chỉ:</span>
							<p className="mr-2">{address.detail}</p>
							<span className="mr-2">{getNameAddressByCode(address.districts, dataDistricts)}</span>
							<span>{getNameAddressByCode(address.city, dataCities)}</span>
						</div>
					</div>
				</div>

				<ModalAccount
					isShowing={isShowing}
					hide={toggle}
					rowData={infoAddress}
					setAddress={setAddress}
				/>
				<div className="mt-8">
					{
						productSelected?.dataProduct.map(({ image, name, _id, price, quantity, size, totalPrice }) => (
							<div className={styles.cartHeader}>
								<div>
									<label className="w-5/12">
										<span>Sản phẩm</span>
									</label>
									<span className="w-1/6">Đơn giá</span>
									<span className="w-1/6">Số lượng</span>
									<span className="w-1/6">Thành tiền</span>
								</div>
								<div key={_id} className={styles.cartBody}>
									<label className="flex items-center w-5/12">
										<img src={image} className="h-[110px] w-[110px] ml-4" alt="image product" />
										<div className="flex flex-col">
											<span className="font-semibold">{name}</span>
											<span className="text-sm opacity-85 mt-2.5">Kích cỡ {size}</span>
										</div>
									</label>
									<span className="w-1/6">{convertToVietnameseDong(price)}</span>
									<span className="w-1/6">{quantity}</span>
									<span className="w-1/6 text-second">{convertToVietnameseDong(totalPrice)}</span>
								</div>
							</div>
						))
					}
				</div>
				<div className="flex justify-between box-border p-2 border rounded shadow bg-white">
					<span>Phương thức thanh toán</span>
					<span>Thanh toán khi nhận hàng</span>
				</div>
			</div>
			<div className={styles.cartPrice}>
				<div className={styles.totalPrice}>
					<div className={styles.priceHeader}>
						<span className={styles.title}>Tạm tính</span>
						<span className={styles.price}>{convertToVietnameseDong(productSelected?.totalPriceSelected)}</span>
					</div>
					<div className={styles.priceHeader}>
						<span className={styles.title}>Tổng tiền</span>
						<span className={styles.price}>{convertToVietnameseDong(productSelected?.totalPriceSelected)}</span>
					</div>
				</div>
				<button onClick={handleSubmitOrder}>
					Đặt hàng
				</button>
			</div>
		</div>
	);
};

export default CheckoutProduct;