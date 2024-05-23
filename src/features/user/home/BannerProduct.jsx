import React from 'react';
import { banner_01, banner_02, banner_03 } from "../../../assets/index";

const BannerProduct = () => {
	return (
		<div className="flex flex-wrap justify-center space-y-5 sm:space-y-0 sm:space-x-5 mt-8 w-full">
			<div className="w-full sm:w-[350px]">
				<div
					className="flex items-center justify-center bg-cover py-2.5 px-5 text-xl h-[200px] sm:h-[265px]"
					style={{
						backgroundImage: `url(${banner_01})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<span className="bg-white py-2.5 px-5 font-semibold text-xl">Thời trang nữ</span>
				</div>
			</div>
			<div className="w-full sm:w-[350px]">
				<div
					className="flex items-center justify-center bg-cover py-2.5 px-5 text-xl h-[200px] sm:h-[265px]"
					style={{
						backgroundImage: `url(${banner_02})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<span className="bg-white py-2.5 px-5 font-semibold text-xl">Phụ kiện</span>
				</div>
			</div>
			<div className="w-full sm:w-[350px]">
				<div
					className="flex items-center justify-center bg-cover py-2.5 px-5 text-xl h-[200px] sm:h-[265px]"
					style={{
						backgroundImage: `url(${banner_03})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<span className="bg-white py-2.5 px-5 font-semibold text-xl">Thời trang nam</span>
				</div>
			</div>
		</div>
	);
};

export default BannerProduct;
