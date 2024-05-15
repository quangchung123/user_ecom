import React, { useEffect, useState } from 'react';
import { useGetListProductSelectedQuery } from "../../../services/productSelected";
import { useSelector } from "react-redux";
import ModalAccount from "../../../components/Modal/ModalAccount";
import useModal from "../../../hooks/useModal";
import { convertToVietnameseDong, getNameAddressByCode } from "../../../utils/help";
import { LOCAL_STORAGE_KEY, STATUS_ORDER } from "../../../config/constant";
import { useGetListUserQuery } from "../../../services/user";
import { useCreateNewOrderMutation } from "../../../services/order";
import { useParams } from "react-router-dom";
import styles from "../styles/Cart.module.scss";
import { useGetAddressQuery } from "../../../services/address";
import dataDistricts from "../../../config/address/districts.json";
import dataCities from "../../../config/address/cities.json";
import ModalAddress from "../../../components/Modal/ModalAddress";
import { useId } from "../../../hooks/useId";

const CheckoutProduct = () => {
	const customer_id = useId();
	const { productSelectedId } = useParams();
	const { data: productSelected } = useGetListProductSelectedQuery(productSelectedId);
	const { isShowing: isShowingModalAccount, toggle: toggleModalAccount } = useModal();
	const { isShowing: isShowingModalAddress, toggle: toggleModalAddress } = useModal();
	const { data: infoCustomer } = useGetListUserQuery();
	const { data: infoAddress } = useGetAddressQuery();
	const [createNewOrder] = useCreateNewOrderMutation();
	const [rowDataAddress, setRowDataAddress] = useState({});
	const [isCreating, setIsCreating] = useState(false);
	const [dataInfoCustomer, setDataInfoCustomer] = useState([]);
	const [address, setAddress] = useState([]);
	const [dataAddressByIdCustomer, setDataAddressByIdCustomer] = useState([]);
	const [addressCheckout, setAddressCheckout] = useState({});

	const handleSubmitOrder = async () => {
		try {
			const payload = {
				products: productSelected,
				customerId: customer_id,
				totalPrice: productSelected?.totalPriceSelected,
				payment: "COD",
				status: STATUS_ORDER.PROCESSING
			};
			await createNewOrder(payload);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		setDataInfoCustomer(infoCustomer?.filter((item) => item._id === customer_id) ?? []);
	}, [infoCustomer, customer_id]);

	useEffect(() => {
		if (dataInfoCustomer.length > 0 && infoAddress?.length > 0) {
			setAddress([
				...dataInfoCustomer,
				...dataAddressByIdCustomer
			]);
		} else {
			setAddress([...dataInfoCustomer])
		}
	}, [dataInfoCustomer, infoAddress, dataAddressByIdCustomer]);

	useEffect(() => {
		setDataAddressByIdCustomer(infoAddress?.filter((item) => item.customer_id === customer_id) ?? []);
	}, [infoAddress, customer_id]);

	useEffect(() => {
		if (dataInfoCustomer.length > 0 && address.length > 0) {
			const customerAddressId = dataInfoCustomer[0].address_Id;
			setAddressCheckout(address.find((item) => item._id === customerAddressId) ?? dataInfoCustomer[0]);
		}
	}, [address, dataInfoCustomer]);
	return (
		<div className={styles.container}>
			<div className={styles.containerCart}>
				<div className="flex flex-col border rounded box-border p-3.5 bg-white shadow">
					<div className="flex justify-between items-center">
						<span className="font-bold">Địa chỉ nhận hàng</span>
						<button onClick={toggleModalAccount} className="px-4 py-2 bg-primary text-white rounded hover:opacity-85">Chọn địa chỉ</button>
					</div>
					<div className="mt-4">
						<div className="mb-2">
							<span className="font-semibold mr-3 italic opacity-65">Tên người nhận:</span>
							<span>{addressCheckout?.name}</span>
						</div>
						<div className="mb-2">
							<span className="font-semibold mr-3 italic opacity-65">Số điện thoại:</span>
							<span>{addressCheckout?.phone}</span>
						</div>
						<div className="mb-2 flex items-center">
							<span className="font-semibold mr-3 italic opacity-65">Địa chỉ:</span>
							<p className="mr-2">{addressCheckout?.detail}</p>
							<span className="mr-2">{getNameAddressByCode(addressCheckout?.districts, dataDistricts)}</span>
							<span>{getNameAddressByCode(addressCheckout?.city, dataCities)}</span>
						</div>
					</div>
				</div>
				<ModalAccount
					isShowing={isShowingModalAccount}
					hide={toggleModalAccount}
					rowData={address}
					setRowDataAddress={setRowDataAddress}
					setIsCreating={setIsCreating}
					infoCustomer={dataInfoCustomer}
					showModalAddress={toggleModalAddress}
				/>
				 <ModalAddress
           isShowing={isShowingModalAddress}
           hide={toggleModalAddress}
           isCreating={isCreating}
           showModalAccount={toggleModalAccount}
           rowData={rowDataAddress}
				 />
				<div className="mt-8">
					{productSelected?.dataProduct?.map(({ image, name, _id, price, quantity, size, totalPrice }) => (
						<div className={styles.cartHeader} key={_id}>
							<div>
								<label className="w-5/12">
									<span>Sản phẩm</span>
								</label>
								<span className="w-1/6">Đơn giá</span>
								<span className="w-1/6">Số lượng</span>
								<span className="w-1/6">Thành tiền</span>
							</div>
							<div key={_id} className="rounded  mb-3 flex items-center justify-between box-border px-4 py-2.5 bg-white">
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
					))}
				</div>
				<div className="box-border p-2 border rounded shadow bg-white">
					<div className="flex justify-between">
						<span>Phương thức thanh toán</span>
						<span>Chọn hình thức</span>
					</div>
					<div>
						<div>
							<input type="radio" />
							<span>Thanh toán khi nhận hàng</span>
						</div>
						<div>
							<input type="radio"/>
							<span>Thanh toán qua thẻ ngân hàng</span>
						</div>
					</div>
				</div>
				<div className="box-border p-2 border rounded shadow bg-white">
					<div className="flex justify-between">
						<span>Lựa chọn đơn vị vận chuyển</span>
						<span>Chọn hình thức</span>
					</div>
					<div>
						<div>
							<input type="radio" />
							<span>Thanh toán khi nhận hàng</span>
						</div>
						<div>
							<input type="radio"/>
							<span>Thanh toán qua thẻ ngân hàng</span>
						</div>
					</div>
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
