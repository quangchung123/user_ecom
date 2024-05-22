import React from 'react';
import {imgFooter} from '../../assets/index'
const Footer = () => {
	return (
		<div className="flex items-center flex-col box-border py-10">
			<div>
				<ul className="flex space-x-4 uppercase text-sm opacity-85">
					<li>Chính sách bảo mật</li>
					<li className="border-l-[1px]"></li>
					<li>Quy chế hoạt động</li>
					<li className="border-l-[1px]"></li>
					<li>Chính sách vận chuyển</li>
					<li className="border-l-[1px]"></li>
					<li>Chính sách trả hàng và hoàn tiền</li>
				</ul>
			</div>
			<div>
				<img
					src={imgFooter}
					className="w-56 h-28"
				/>
			</div>
			<div className="flex flex-col items-center opacity-85">
				<h6 className="text-sm mb-3">Công ty TNHH Shoes Store</h6>
				<div className="flex flex-col items-center text-xs space-y-1">
					<p>Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn</p>
					<p>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)</p>
					<p>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>
					<p>© 2015 - Bản quyền thuộc về Công ty TNHH Shoes Store</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;