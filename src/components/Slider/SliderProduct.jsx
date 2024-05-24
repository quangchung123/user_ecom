import React from 'react';
import { imgSlider } from '../../assets/index';
import { Link } from "react-router-dom";
import { ROUTER_INIT } from "../../config/constant";

const SliderProduct = () => {
	return (
		<div className="w-full relative">
			<div className="absolute top-1/2  md:-translate-y-1/2 left-4 md:left-40 md:w-2/5 text-center md:text-left px-4 md:px-0">
				<h6 className="font-semibold text-[#282828] text-sm">BỘ SƯU TẬP XUÂN HÈ 2024</h6>
				<h1 className="mt-4 md:mt-8 text-2xl md:text-7xl font-normal">Nhận tới 30% giảm giá hàng mới</h1>
				<Link to={ROUTER_INIT.HOME}>
					<button className="py-2 px-6 bg-primary text-white rounded mt-4 md:mt-8">Mua ngay</button>
				</Link>
			</div>
			<img
				alt="Banner"
				src={imgSlider}
				className="object-cover w-full h-[60vh] md:h-screen"
			/>
		</div>
	);
};

export default SliderProduct;
