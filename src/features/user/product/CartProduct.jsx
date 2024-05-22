import React, { useEffect, useState, useMemo } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useDeleteItemToCartMutation, useGetListItemCartQuery} from "../../../services/cart";
import styles from "../styles/Cart.module.scss";
import {useNavigate} from "react-router-dom";
import {ROUTER_INIT} from "../../../config/constant";
import {useCreateProductSelectedMutation} from "../../../services/productSelected";
import {convertToVietnameseDong} from "../../../utils/help";
import {setProductSelected} from "../../../store/action/productSelected";

const Cart = () => {
	const customerId = useSelector(state => state.userAccount.user.customerId);
	const productBuyNowById = useSelector(state => state.productBuyNow.productSelectedId);
	const dispatch = useDispatch();
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
		setSelectedRow(selectedRow?.length === dataListCart?.length ? [] : dataListCart?.map(item => item._id))
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

	const handleNavigateCheckOut =  () => {
		const payload = {
			dataProduct: dataSelected,
			totalPriceSelected: totalPriceSelected
		}
		dispatch(setProductSelected({products: payload}));
		navigate(ROUTER_INIT.CHECKOUT);
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

	useEffect(() => {
		window.scrollTo(0,0)
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.containerCart}>
				<div className={styles.cartHeader}>
					<div>
						<label className="w-5/12">
							<input type="checkbox" checked={selectedRow?.length === dataListCart?.length && selectedRow?.length !== 0 && dataListCart?.length !==0} onChange={handleSelectedAll}/>
							<span>Tất cả ({dataListCart?.length || 0} sản phẩm)</span>
						</label>
						<span className="w-1/6">Đơn giá</span>
						<span className="w-1/6">Số lượng</span>
						<span className="w-1/6">Thành tiền</span>
						<span className="w-1/12">Thao tác</span>
					</div>
				</div>
					{
						dataListCart?.map(({ image, name, _id, price, quantity, size, totalPrice }) => (
							<div key={_id} className={styles.cartBody}>
								<label className="flex items-center w-5/12 ">
									<input type="checkbox" checked={selectedRow.includes(_id)} onChange={() => handleGetDataRow(_id)} className="shrink-0" />
									<img src={image} className="h-[110px] w-[110px]" alt="image product" />
									<div className="flex flex-col items-center">
										<span className="font-semibold">{name}</span>
										<span className="text-sm opacity-85 mt-2.5">Kích cỡ {size}</span>
									</div>
								</label>
								<span className="w-1/6">{convertToVietnameseDong(price)}</span>
								<span className="w-1/6">{quantity}</span>
								<span className="w-1/6 text-second">{convertToVietnameseDong(totalPrice)}</span>
								<button onClick={() => handleDeleteItem(_id)} className="w-1/12">
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
				<button
					onClick={handleNavigateCheckOut}
					disabled={dataSelected.length === 0}
					className={`${dataSelected.length === 0 ? 'cursor-not-allowed opacity-65' : 'cursor-pointer'}`}
				>
					Mua hàng ({dataSelected.length} sản phẩm)
				</button>
			</div>
		</div>
	);
};

export default Cart;
