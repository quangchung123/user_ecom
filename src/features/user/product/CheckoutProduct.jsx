import React, {useEffect, useMemo, useState} from 'react';
import { useGetListProductSelectedQuery } from "../../../services/productSelected";
import { useSelector } from "react-redux";
import ModalAccount from "../../../components/Modal/ModalAccount";
import useModal from "../../../hooks/useModal";
import {convertToVietnameseDong, getDataInPersistStore, getNameAddressByCode, notifyConfirm} from "../../../utils/help";
import {LOCAL_STORAGE_KEY, PERSIT_KEY, ROUTER_INIT, STATUS_ORDER} from "../../../config/constant";
import { useGetListUserQuery } from "../../../services/user";
import { useCreateNewOrderMutation } from "../../../services/order";
import {useNavigate, useParams} from "react-router-dom";
import styles from "../styles/Cart.module.scss";
import { useGetAddressQuery } from "../../../services/address";
import dataDistricts from "../../../config/address/districts.json";
import dataCities from "../../../config/address/cities.json";
import ModalAddress from "../../../components/Modal/ModalAddress";
import { useId } from "../../../hooks/useId";
import {paymentMethods, shippingMethods} from "../../../config";
import {useDeleteItemToCartMutation} from "../../../services/cart";
import {useGetDetailProductQuery, useGetListProductQuery, useUpdateProductMutation} from "../../../services/product";
import product from "../../admin/Product";

const CheckoutProduct = () => {
	const customerIdStoreRedux = useSelector((state) => state.userAccount);
	const dataCustomer = getDataInPersistStore(customerIdStoreRedux, PERSIT_KEY.USER_ACCOUNT);
	const navigate = useNavigate();
	const listProductSelected = useSelector((state) => state.productSelected.products);
	const { data: listProduct } = useGetListProductQuery();
	const [updateProduct] = useUpdateProductMutation()
	const { isShowing: isShowingModalAccount, toggle: toggleModalAccount } = useModal();
	const { isShowing: isShowingModalAddress, toggle: toggleModalAddress } = useModal();
	const { data: infoCustomer } = useGetListUserQuery();
	const { data: infoAddress } = useGetAddressQuery();
	const [createNewOrder] = useCreateNewOrderMutation();
	const [deleteItemToCart] = useDeleteItemToCartMutation();
	const [rowDataAddress, setRowDataAddress] = useState({});
	const [isCreating, setIsCreating] = useState(false);
	const [dataInfoCustomer, setDataInfoCustomer] = useState([]);
	const [address, setAddress] = useState([]);
	const [dataAddressByIdCustomer, setDataAddressByIdCustomer] = useState([]);
	const [addressCheckout, setAddressCheckout] = useState({});
	const [selectedShipping, setSelectedShipping] = useState('');
	const [selectedPayment, setSelectedPayment] = useState('');
	const handleShippingChange = (event) => {
		setSelectedShipping(event.target.value);
	};
	const handlePaymentChange = (event) => {
		setSelectedPayment(event.target.value);
	};
	const isAllRadioSelected = () => {
		return selectedShipping !== '' && selectedPayment !== '';
	};
	const handleSubmitOrder = async () => {
		try {
			const payload = {
			address: addressCheckout,
			products: listProductSelected,
			totalPrice: listProductSelected?.totalPriceSelected,
			status: STATUS_ORDER.PROCESSING,
			shipping: selectedShipping,
			payment: selectedPayment,
			email: dataInfoCustomer[0].email,
			customer_id: dataCustomer.user.customerId,
		}
		const response = await createNewOrder(payload);
		if (response) {
			const deletePromises = listProductSelected.dataProduct.map((product) =>
				deleteItemToCart(product._id)
			);
			const updatePromises = listProductSelected.dataProduct.map(product => {
				const productDetailItem = listProduct.find(item => item._id === product.productId);
				if(productDetailItem) {
					return updateProduct({
						...productDetailItem,
						count: Number(productDetailItem.count) - product.quantity,
						countBought: Number(productDetailItem.countBought + 1)
					})
				}
			})
			await Promise.all([...deletePromises, ...updatePromises]);
			notifyConfirm("Tạo đơn hàng thành công")
			navigate(ROUTER_INIT.ORDER);
		}
	} catch (e) {
		console.log(e);
	}
	};

	useEffect(() => {
		setDataInfoCustomer(infoCustomer?.filter((item) => item._id === dataCustomer.user.customerId) ?? []);
	}, [infoCustomer, dataCustomer.user.customerId]);

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
		setDataAddressByIdCustomer(infoAddress?.filter((item) => item.customer_id === dataCustomer.user.customerId) ?? []);
	}, [infoAddress, dataCustomer.user.customerId]);

	useEffect(() => {
		if (dataInfoCustomer.length > 0 && address.length > 0) {
			const customerAddressId = dataInfoCustomer[0].address_Id;
			setAddressCheckout(address.find((item) => item._id === customerAddressId) ?? dataInfoCustomer[0]);
		}
	}, [address, dataInfoCustomer]);

	useEffect(() => {
		if(Object.keys(listProductSelected).length === 0) {
			navigate(ROUTER_INIT.CART)
		}
	}, [listProductSelected]);
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
							<span className="mr-3 opacity-65">Tên người nhận:</span>
							<span>{addressCheckout?.name}</span>
						</div>
						<div className="mb-2">
							<span className="mr-3 opacity-65">Số điện thoại:</span>
							<span>{addressCheckout?.phone}</span>
						</div>
						<div className="mb-2 flex items-center">
							<span className="mr-3 opacity-65">Địa chỉ:</span>
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
					{listProductSelected?.dataProduct?.map(({ image, name, _id, price, quantity, size, totalPrice }) => (
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
					<div className="mt-8 p-4 border rounded shadow bg-white space-y-4">
						<div className="flex justify-between items-center pb-2 border-b">
							<span className="font-semibold">Phương thức thanh toán</span>
						</div>
						<div className="space-y-2">
							{paymentMethods.map(method => (
								<label key={method.id} className="flex items-center space-x-2">
								 <input
									type="radio"
									name="payment"
									value="Thanh toán khi nhận hàng"
									onChange={handlePaymentChange}
									checked={selectedPayment ===  method.name}
									className="form-radio text-blue-500"
									/>
								  <span>{method.name}</span>
								</label>
							))}
						</div>
					</div>
					<div className="mt-8 p-4 border rounded shadow bg-white space-y-4">
						<div className="flex justify-between items-center pb-2 border-b">
							<span className="font-semibold">Đơn vị vận chuyển</span>
						</div>
						<div className="space-y-2">
							{shippingMethods.map(method => (
								<label key={method.id} className="flex items-center space-x-2">
									<input
										type="radio"
										name="shipping"
										value={method.name}
										onChange={handleShippingChange}
										checked={selectedShipping === method.name}
										className="form-radio text-blue-500"
									/>
									<span>{method.name}</span>
								</label>
							))}
						</div>
					</div>
			</div>
			<div className={styles.cartPrice}>
				<div className={styles.totalPrice}>
					<div className={styles.priceHeader}>
						<span className={styles.title}>Tạm tính</span>
						<span className={styles.price}>{convertToVietnameseDong(listProductSelected?.totalPriceSelected)}</span>
					</div>
					<div className={styles.priceHeader}>
						<span className={styles.title}>Tổng tiền</span>
						<span className={styles.price}>{convertToVietnameseDong(listProductSelected?.totalPriceSelected)}</span>
					</div>
				</div>
				<button
					onClick={handleSubmitOrder}
					className={`${!isAllRadioSelected() ? 'opacity-65 cursor-not-allowed' : 'cursor-pointer hover:opacity-85'}`}
					disabled={!isAllRadioSelected()}
				>
					Đặt hàng
				</button>
			</div>
		</div>
	);
};

export default CheckoutProduct;
