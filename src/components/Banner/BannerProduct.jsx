import React, { useState } from 'react';
import {imgBanner} from '../../assets/index'
const BannerProduct = ({ bannerImage }) => {
	return (
		<div className="w-full relative">
			<div className="absolute top-52 left-48">
				<h6>SPRING / SUMMER COLLECTION 2017</h6>
				<h1>Get up to 30% Off New Arrivals</h1>
				<button>Mua ngay</button>
			</div>
				<img
					alt="Banner"
					src={imgBanner}
					className="object-cover w-full min-h-screen"
				/>
		</div>
	);
};

export default BannerProduct;
