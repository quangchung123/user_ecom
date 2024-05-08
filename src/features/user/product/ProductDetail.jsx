import React, {useEffect, useState} from 'react';
import MainLayout from "../../../container/user/MainLayout";
import {useParams} from "react-router-dom";
import {useGetDetailProductQuery} from "../../../services/product";
import Comment from "../comment/Comment";
import {useDispatch, useSelector} from "react-redux";
import {setRating} from "../../../store/action/filterRatingSlice";
import {ratings, sizes} from "../../../config";
import {sizeImage} from "../../../assets"
import {useCreateNewItemToCartMutation} from "../../../services/cart";

const ProductDetail = () => {
	const { productId } =useParams();
	const customerId = useSelector((state) => state.userAccount.user.customerId);
	const { data } = useGetDetailProductQuery(productId);
	const [createNewItemToCart] = useCreateNewItemToCartMutation();
	const dispatch = useDispatch();
	const [activeRating, setActiveRating] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [sizeNumber, setSizeNumber] = useState(0);
	const [activeBtnSize, setActiveBtnSize] = useState(null);
	const handleQuantity = (quantity, type) => {
		if(quantity>=1 && type === 'decrement') {
			setQuantity(quantity - 1);
		} else if(type === 'increment'){
			setQuantity(quantity + 1);
		}
	}
	const handleGetSize = (size) =>{
		setSizeNumber(size)
	}
	const handleAddToCart = async () => {
		if (data && customerId) {
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
			alert("Vui long dang nhap")
		}
	}
	return (
		<MainLayout>
			<div className="bg-white box-border px-40 pt-36">
				<div className="grid grid-cols-detailProductCol gap-9">
					<img src={data?.image} className="border-x-2 h-[110px] w-full" alt="" />
					<img src={data?.image} className="h-[500px] border-x-2 w-full border rounded-md" alt="" />
					<div className="h-96 w-full">
						<span className="font-semibold text-3xl">{data?.name}</span>
						<p className="pt-3 pb-8">{data?.description}</p>
						<div className="w-full bg-[#f5f5f5] h-10 flex justify-center items-center">
							<i className="bi bi-truck mr-3"></i>
							<span>Miễn phí vận chuyển</span>
						</div>
						<p className="text-second mt-8">{data?.price}</p>
						<div className="mt-4">
							<span className="mr-3">Kích cỡ</span>
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
						<div className="mt-8 flex">
					    <span className="text-lg">
					        Số lượng
					    </span>
							<div className="ml-4 flex">
								<button type="button" className="px-2.5 py-1 border border-gray-300 rounded-l focus:outline-none" onClick={() => handleQuantity(quantity, "decrement")}>
									-
								</button>
								<input type="text" className="border-t py-1 border-b border-gray-300 focus:outline-none w-16 text-center" value={quantity} readOnly/>
								<button type="button" className="px-2.5 py-1 border border-gray-300 rounded-r focus:outline-none" onClick={() => handleQuantity(quantity, "increment")}>
									+
								</button>
							</div>
							<div className="flex ml-4">
								<span className="mr-2">{data?.count}</span>
								<p>Sản phẩm sẵn có</p>
							</div>
						</div>

						<div
							className="bg-red-500 h-10 flex justify-center items-center mt-8 cursor-pointer text-white rounded hover:opacity-85"
							onClick={handleAddToCart}
						>
							<i className="bi bi-cart-check-fill mr-3"></i>
							<span>Thêm vào giỏ hàng</span>
						</div>
					</div>
				</div>
				<div className="h-auto w-full rounded mt-8 shadow border">
					<div className="box-border py-6 px-5">
						<h2 className="uppercase text-lg font-semibold pb-4">Bảng quy đổi kích thước</h2>
						<img src={sizeImage} alt="size"/>
					</div>
				</div>
				<div className="h-auto w-full rounded mt-8 shadow-xl border">
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
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProductDetail;