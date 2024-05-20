import React, { useState } from 'react';
import {imgSlider} from '../../assets/index'
const SliderProduct = () => {
	return (
		<div className="w-full relative">
			<div className="absolute top-52 left-40 w-96">
				<h6 className="font-semibold">BỘ SƯU TẬP XUÂN HÈ 2024</h6>
				<h1 className="mt-8 text-5xl font-semibold">Nhận tới 30% giảm giá hàng mới</h1>
				<button className="py-2 px-6 bg-primary text-white rounded mt-8">Mua ngay</button>
			</div>
				<img
					alt="Banner"
					src={imgSlider}
					className="object-cover w-full min-h-screen"
				/>
		</div>
	);
};

export default SliderProduct;
