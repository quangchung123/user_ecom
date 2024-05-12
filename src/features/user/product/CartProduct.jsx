import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from "react-redux";
import {useDeleteItemToCartMutation, useGetListItemCartQuery} from "../../../services/cart";
import styles from "../styles/Cart.module.scss";
import {useNavigate} from "react-router-dom";
import {ROUTER_INIT} from "../../../config/constant";
import {useCreateProductSelectedMutation} from "../../../services/productSelected";
import {convertToVietnameseDong} from "../../../utils/help";

const Cart = () => {
	const customerId = useSelector(state => state.userAccount.user.customerId);
	const productBuyNowById = useSelector(state => state.productSelected.productId);
	const [selectedRow, setSelectedRow] = useState([]);
	const { data } = useGetListItemCartQuery();
	const [dataListCart, setDataListCart] = useState(null);
	const [deleteItemToCart] = useDeleteItemToCartMutation();
	const navigate = useNavigate();
	const [createProductSelected] = useCreateProductSelectedMutation();

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

	const handleNavigateCheckOut = async () => {
		try {
			const response = await createProductSelected({
				dataProduct: dataSelected,
				totalPriceSelected: totalPriceSelected
			});
			const productSelectedId = response.data._id;
			navigate(`${ROUTER_INIT.CHECKOUT}/${productSelectedId}`);
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (data) {
			setDataListCart(data.filter(dataItemCart => dataItemCart.customerId === customerId));
		}
		if (productBuyNowById) {
			setSelectedRow([productBuyNowById])
			setDataListCart(preDataListCart => {
				const selectedIndex = preDataListCart.findIndex(item => item._id === productBuyNowById);
				if(selectedIndex !== -1) {
					const productSelected = preDataListCart.splice(selectedIndex, 1)[0];
					return [productSelected, ...preDataListCart];
				}
				return preDataListCart;
			})
		}
	}, [data, customerId, productBuyNowById]);

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
					{
						dataListCart?.map(({ image, name, _id, price, quantity, size, totalPrice }) => (
							<div key={_id} className={styles.cartBody}>
								<label className="flex items-center">
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
			<div className={styles.cartPrice}>
				<div className={styles.totalPrice}>
					<div className={styles.priceHeader}>
						<span className={styles.title}>Tạm tính</span>
						<span className={styles.price}>{convertToVietnameseDong(totalPriceSelected)}</span>
					</div>
					<div className={styles.priceHeader}>
						<span className={styles.title}>Tổng tiền</span>
						<span className={styles.price}>{convertToVietnameseDong(totalPriceSelected)}</span>
					</div>
				</div>
				<button onClick={handleNavigateCheckOut}>
					Mua hàng ({dataSelected.length} sản phẩm)
				</button>
			</div>
		</div>
	);
};

export default Cart;
