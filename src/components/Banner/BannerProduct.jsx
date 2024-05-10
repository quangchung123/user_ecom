import React, { useState } from 'react';

const BannerProduct = ({ bannerImage }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const nextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === bannerImage.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? bannerImage.length - 1 : prevIndex - 1
		);
	};

	return (
		<div className="relative h-auto w-full">
			<button
				className="absolute top-1/2 transform -translate-y-1/2 left-0"
				onClick={prevImage}
			>
				<i className="bi bi-arrow-left-circle-fill"></i>
			</button>
			<button
				className="absolute top-1/2 transform -translate-y-1/2 right-0"
				onClick={nextImage}
			>
				<i className="bi bi-arrow-right-circle-fill"></i>
			</button>
			{bannerImage?.map((image, index) => (
				<img
					key={index}
					src={image.product}
					alt="Banner"
					className={`${index === currentImageIndex ? 'block' : 'hidden'} h-[700px] w-full object-cover`}
				/>
			))}
		</div>
	);
};

export default BannerProduct;
