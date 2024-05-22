import React from 'react';

const BenefitProduct = () => {
	return (
		<div className="flex mt-8 w-full space-x-0.5 uppercase">
			<div className="flex items-center justify-center h-20 bg-[#f3f3f3] w-1/3">
				<i className="bi bi-truck text-primary text-3xl mr-3"></i>
				<span className="font-semibold text-sm opacity-85">Miễn phí vận chuyển</span>
			</div>
			<div className="flex items-center justify-center h-20 bg-[#f3f3f3] w-1/3">
				<i className="bi bi-cash text-primary text-3xl mr-3"></i>
				<span className="font-semibold text-sm opacity-85">Thanh toán khi nhận hàng</span>
			</div>
			<div className="flex items-center justify-center h-20 bg-[#f3f3f3] w-1/3">
				<i className="bi bi-cash text-primary text-3xl mr-3"></i>
				<span className="font-semibold text-sm opacity-85">Đổi trả trong vòng 7 ngày</span>
			</div>
			<div className="flex items-center justify-center h-20 bg-[#f3f3f3] w-1/3">
				<i className="bi bi-cash text-primary text-3xl mr-3"></i>
				<span className="font-semibold text-sm opacity-85">Mở cửa từ thứ 2 đến thứ 6</span>
			</div>
		</div>
	);
};

export default BenefitProduct;