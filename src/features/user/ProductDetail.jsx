import React from 'react';
import MainLayout from "../../container/user/MainLayout";
import {useParams} from "react-router-dom";
import {useGetDetailProductQuery} from "../../services/product";
import Comment from "./comment/Comment";
import {useDispatch} from "react-redux";
import {setRating} from "../../store/action/filterRatingSlice";
import {ratings} from "../../config";

const ProductDetail = () => {
	const { productId } =useParams();
	const { data } = useGetDetailProductQuery(productId);
	const dispatch = useDispatch();
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
						<div className="mt-8">
							<span className="font-semibold text-lg">
								Số lượng
							</span>
							<div className="group-input">
									<input
										value="-"
										type="button"
										className="input-scanner"
										// onClick={handleDecrement}
									/>
									<input
										type="text"
										className="input-hiden"
										// value={quantity}
										readOnly
									/>
									<input
										value="+"
										type="button"
										className="input-scanner"
										// onClick={handleIncrement}
									/>
								</div>
						</div>
						<div className="bg-red-500 h-10 flex justify-center items-center mt-8 cursor-pointer text-white rounded">
							<i className="bi bi-cart-check-fill mr-3"></i>
							<span>Thêm vào giỏ hàng</span>
						</div>
					</div>
				</div>
				<div>
					<ul>
						{ratings.map((rating, index) => (
							<li key={index}>
								<button onClick={() => dispatch(setRating({rating: rating.value}))}>
									{rating.label}
								</button>
							</li>
						))}
					</ul>
					<Comment productId={productId}/>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProductDetail;