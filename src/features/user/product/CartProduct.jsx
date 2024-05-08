import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from "react-redux";
import {useDeleteItemToCartMutation, useGetListItemCartQuery} from "../../../services/cart";
import styles from "../styles/Cart.module.scss";
import OrderProduct from "./OrderProduct";

const Cart = () => {
	const customerId = useSelector(state => state.userAccount.user.customerId);
	const [selectedRow, setSelectedRow] = useState([]);
	const { data } = useGetListItemCartQuery();
	const [dataListCart, setDataListCart] = useState(null);
	const [deleteItemToCart] = useDeleteItemToCartMutation()

	useEffect(() => {
		if (data) {
			setDataListCart(data.filter(dataItemCart => dataItemCart.customerId === customerId));
		}
	}, [data, customerId]);

	const handleGetDataRow = (value) => {
		setSelectedRow(prevSelectedRow => prevSelectedRow.includes(value)
			? prevSelectedRow.filter(rowId => rowId !== value)
			: [...prevSelectedRow, value]
		);
	};
	const handleSelectedAll = () => {
		setSelectedRow(selectedRow.length === dataListCart?.length ? [] : dataListCart?.map(item => item._id))
	}

	const dataSelected = useMemo(() => {
		return dataListCart?.filter(item => selectedRow.includes(item._id)) || []
	},[selectedRow, dataListCart]);
	const totalPriceSelected = useMemo(() => {
		return dataSelected.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, 0)
	},[dataSelected])

	const handleDeleteItem = async (index) => {
		await deleteItemToCart(index)
	}

	return (
		<div className={styles.container}>
			<div className={styles.containerCart}>
				<div className={styles.cartHeader}>
					<div>
						<label>
							<input type="checkbox" checked={selectedRow?.length === dataListCart?.length} onChange={handleSelectedAll}/>
							<span>Tất cả ({data?.length || 0} sản phẩm)</span>
						</label>
						<span>Đơn giá</span>
						<span>Số lượng</span>
						<span>Thành tiền</span>
						<span>Thao tác</span>
					</div>
				</div>
				<div className={styles.cartBody}>
					{
						dataListCart?.map(({ image, name, _id, price, quantity, size, totalPrice }) => (
							<div key={_id}>
								<label>
									<input type="checkbox" checked={selectedRow.includes(_id)} onChange={() => handleGetDataRow(_id)} />
									<div>
										<img src={image} className="h-[110px] w-[110px]" alt="image product" />
										<span>{name}</span>
									</div>
									<span>Kích cỡ {size}</span>
								</label>
								<div>
									<span>{price}</span>
									<sup>đ</sup>
								</div>
								<span>{quantity}</span>
								<span>{totalPrice}</span>
								<button onClick={() => handleDeleteItem(_id)}>
									<i className="bi bi-trash"></i>
								</button>
							</div>
						))
					}
				</div>
			</div>
			<OrderProduct totalPriceSelected={totalPriceSelected} dataSelected={dataSelected}/>
		</div>
	);
};

export default Cart;
