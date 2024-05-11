import React, {useEffect, useState} from 'react';
import MainLayout from "../../../container/user/MainLayout";
import {useNavigate, useParams} from "react-router-dom";
import {useGetDetailProductQuery} from "../../../services/product";
import Comment from "../comment/Comment";
import {useDispatch, useSelector} from "react-redux";
import {setRating} from "../../../store/action/filterRatingSlice";
import {ratings, sizes} from "../../../config";
import {sizeImage} from "../../../assets"
import {useCreateNewItemToCartMutation} from "../../../services/cart";
import {ROUTER_INIT} from "../../../config/constant";
import {convertToVietnameseDong} from "../../../utils/help";
import useModal from "../../../hooks/useModal";
import ModalLogin from "../../../components/Modal/ModalLogin";
import ModalRegister from "../../../components/Modal/ModalRegister";

const ProductDetail = () => {
	const { productId } =useParams();
	const customerId = useSelector((state) => state.userAccount.user.customerId);
	const navigate = useNavigate();
	const { data } = useGetDetailProductQuery(productId);
	const [createNewItemToCart] = useCreateNewItemToCartMutation();
	const dispatch = useDispatch();
	const [activeRating, setActiveRating] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [sizeNumber, setSizeNumber] = useState(0);
	const [activeBtnSize, setActiveBtnSize] = useState(null);
	const [sizeSelected, setSizeSelected] = useState(false);
	const [quantitySelected, setQuantitySelected] = useState(false);
	const {isShowing, toggle} = useModal();
	const [openModalRegister, setOpenModalRegister] = useState(false);
	const handleQuantity = (quantity, type) => {
		if(quantity>1 && type === 'decrement') {
			setQuantity(quantity - 1);
		} else if(type === 'increment' && quantity < data?.count){
			setQuantity(quantity + 1);
		}
		setQuantitySelected(true)
	}
	const handleGetSize = (size) =>{
		setSizeNumber(size)
		setSizeSelected(true)
	}
	const handleCreateItem = async (statusCustomer) => {
		if (data && customerId && sizeSelected && quantitySelected) {
			const { image, name, price } = data;
			const totalPrice = price * quantity;
			const payload = {
				image: image,
				name: name,
				price: price,
				size: sizeNumber,
				quantity: quantity,
				totalPrice: totalPrice,
				customerId: customerId
			}
			await createNewItemToCart(payload);
		} else {
			toggle();
		}
		if(statusCustomer === "buyNow") {
			navigate(ROUTER_INIT.CART)
		}
	}
	useEffect(() => {
		window.scrollTo(0, 0)
	}, []);
	return (
		<MainLayout>
			<div className="box-border px-40 pt-16">
				<div className="h-auto w-full shadow-lg border rounded-lg box-border p-5 bg-white grid grid-cols-detailProductCol gap-9">
					<img src={data?.image} className="border-x-2 h-[110px] w-full" alt="" />
					<img src={data?.image} className="h-[500px] border-x-2 w-full border rounded-md" alt="" />
					<div className="h-96 w-full">
						<span className="font-semibold text-3xl">{data?.name}</span>
						<p className="pt-3 pb-8">{data?.description}</p>
						<div className="w-full bg-[#f5f5f5] h-10 flex justify-center items-center">
							<i className="bi bi-truck mr-3"></i>
							<span>Miễn phí vận chuyển</span>
						</div>
						<div className="w-full h-10 bg-[#fafafa] flex items-center mt-8">
							<p className="text-second font-bold text-lg ml-3">{convertToVietnameseDong(data?.price)}</p>
						</div>
						<div className="mt-4">
							<span className="mr-3 text-gray-500">Kích cỡ</span>
							{sizes.map(({key, value}) => (
								<button
									key={key}
									className={`py-1.5 px-5 mr-3 border hover:border-primary hover:text-primary ${activeBtnSize === key ? 'border-primary text-primary': ''}`}
									onClick={() => {
										handleGetSize(value)
										setActiveBtnSize(key)
									}}
								>
									{value}
								</button>
							))}
						</div>
						<div className="mt-8 flex items-center">
					    <span className="text-gray-500">
					        Số lượng
					    </span>
							<div className="ml-4 flex">
								<button
									type="button"
									className={`px-2.5 py-1 border border-gray-300 rounded-l focus:outline-none ${quantity <=0? 'cursor-not-allowed': 'cursor-pointer'}`}
									onClick={() => handleQuantity(quantity, "decrement")}
								>
									-
								</button>
								<input type="text" className="border-t py-1 border-b border-gray-300 focus:outline-none w-16 text-center" value={quantity} readOnly/>
								<button
									type="button"
									className={`px-2.5 py-1 border border-gray-300 rounded-r focus:outline-none ${quantity < data?.count? 'cursor-pointer': 'cursor-not-allowed'}`}
									onClick={() => handleQuantity(quantity, "increment")}
								>
									+
								</button>
							</div>
							<div className="flex ml-4 items-center">
								<span className="mr-2">{data?.count}</span>
								<p>Sản phẩm sẵn có</p>
							</div>
						</div>
						<div className="flex items-center justify-between box-border px-14 mt-8">
							<button
								className={`border-primary border py-2 px-4 flex justify-center items-center cursor-pointer text-primary rounded hover:opacity-85 ${sizeSelected? 'cursor-pointer': 'cursor-not-allowed'}`}
								onClick={() => handleCreateItem("addToCart")}
								disabled={!sizeSelected}
							>
								<i className="bi bi-cart-check-fill mr-3"></i>
								<span>Thêm vào giỏ hàng</span>
							</button>
							<button
								className={`bg-primary py-2 px-4 flex justify-center items-center cursor-pointer text-white rounded hover:opacity-85 ${sizeSelected? 'cursor-pointer': 'cursor-not-allowed'} `}
								onClick={() => handleCreateItem("buyNow")}
								disabled={!sizeSelected}
							>
								Mua ngay
							</button>
						</div>
					</div>
				</div>
				<div className="h-auto w-full rounded mt-8 shadow border bg-white">
					<div className="box-border py-6 px-5">
						<h2 className="uppercase text-lg font-semibold pb-4">Bảng quy đổi kích thước</h2>
						<img src={sizeImage} alt="size"/>
					</div>
				</div>
				<div className="h-auto w-full rounded mt-8 shadow-xl border bg-white">
					<div className="box-border py-6 px-5">
						<h2 className="uppercase text-xl font-semibold pb-4">đánh giá sản phẩm</h2>
						<div className="w-full border shadow rounded box-border py-4 px-10">
							<ul className="flex">
								{ratings.map((rating, index) => (
									<li key={index}>
										<button
											onClick={() => {
												dispatch(setRating({rating: rating.value}))
												setActiveRating(rating.value)
											}}
											className={`border rounded py-1.5 px-5 ${activeRating === rating.value ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
										>
											{rating.label}
										</button>
									</li>
								))}
							</ul>
						</div>
						<Comment productId={productId}/>
						<ModalLogin
							isShowingLogin={isShowing}
							showLogin={toggle}
							setOpenModalRegister={setOpenModalRegister}
						/>
						<ModalRegister
							isShowingRegister={openModalRegister}
							hideRegister={setOpenModalRegister}
							hideLogin={toggle}
						/>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProductDetail;