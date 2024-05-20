import React from 'react';

const BenefitProduct = () => {
	return (
		<div className="flex mt-8 w-full space-x-0.5">
			<div className="flex items-center justify-center h-20 bg-[#f3f3f3] w-1/3">
				<i className="bi bi-truck text-primary text-3xl mr-3"></i>
				<span className="font-semibold text-base">Miễn phí vận chuyển</span>
			</div>
			<div className="flex items-center justify-center h-20 bg-[#f3f3f3] w-1/3">
				<i className="bi bi-cash text-primary text-3xl mr-3"></i>
				<span className="font-semibold text-base">Thanh toán khi nhận hàng</span>
			</div>
			<div className="flex items-center justify-center h-20 bg-[#f3f3f3] w-1/3">
				<i className="bi bi-cash text-primary text-3xl mr-3"></i>
				<span className="font-semibold text-base">Đổi trả trong vòng 7 ngày</span>
			</div>
			<div className="flex items-center justify-center h-20 bg-[#f3f3f3] w-1/3">
				<i className="bi bi-cash text-primary text-3xl mr-3"></i>
				<span className="font-semibold text-base">Mở cửa từ thứ 2 đến thứ 6</span>
			</div>
		</div>
	);
};

export default BenefitProduct;