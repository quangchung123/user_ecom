import React, {useEffect, useMemo, useState} from 'react';
import MainLayout from "../../../container/user/MainLayout";
import { useGetListProductQuery } from "../../../services/product";
import { useGetListCategoriesQuery } from "../../../services/categories";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertToVietnameseDong } from "../../../utils/help";
import { LABEL_SORT, ROUTER_INIT } from "../../../config/constant";
import SortButton from "../../../components/Elements/Button/SortButton";
import SliderProduct from "../../../components/Slider/SliderProduct";
import BannerProduct from "./BannerProduct";
import BenefitProduct from "./BenefitProduct";
import {articles} from "../../../config";
import CountDown from "./CountDown";

const Home = () => {
	const { data: productList } = useGetListProductQuery();
	const { data: categoryList } = useGetListCategoriesQuery();
	const [valueSelectOption, setValueSelectOption] = useState('All category');
	const [productOfCategories, setProductOfCategories] = useState(productList);
	const valueInput = useSelector(state => state.inputSearch.valueInput);
	const navigate = useNavigate();
	const [sortBy, setSortBy] = useState(null);
	const { NAME_A_TO_Z, NAME_Z_TO_A, PRICE_MAX_TO_MIN, PRICE_MIN_TO_MAX } = LABEL_SORT;

	const handleSelect = (event, category) => {
		setValueSelectOption(category);
	};
	const sortProductsByPrice = (sortOrder) => {
		const sortedProducts = [...productOfCategories].sort((a, b) => {
			if (sortOrder === PRICE_MIN_TO_MAX) {
				return parseFloat(a.price) - parseFloat(b.price);
			} else {
				return parseFloat(b.price) - parseFloat(a.price);
			}
		});
		setProductOfCategories(sortedProducts);
		setSortBy(sortOrder);
	};
	const sortProductsByName = (sortOrder) => {
		const sortedProducts = [...productOfCategories].sort((a, b) => {
			let nameA = a.name.toUpperCase();
			let nameB = b.name.toUpperCase();
			if (sortOrder === NAME_A_TO_Z) {
				return nameA.localeCompare(nameB);
			} else if (sortOrder === NAME_Z_TO_A) {
				return nameB.localeCompare(nameA);
			}
			return 0;
		});
		setProductOfCategories(sortedProducts);
		setSortBy(sortOrder);
	};

	//check product have property countBought
	const topSellingProducts = productList
		?.filter(product => product.countBought !== undefined)
		.sort((a, b) => b.countBought - a.countBought)
		.slice(0, 4);
	const handleDetailProductId = (index) => {
		navigate(`${ROUTER_INIT.PRODUCT}/${index}`);
	};
	useEffect(() => {
		let filteredProducts = productList;
		if (valueSelectOption && valueSelectOption !== "All category") {
			filteredProducts = productList?.filter((products) => products.categories === valueSelectOption);
		}
		const dataFiltered = filteredProducts?.filter((item) => item.name.toLowerCase().includes(valueInput.toLowerCase()));
		setProductOfCategories(dataFiltered);
	}, [valueSelectOption, productList, valueInput]);

	return (
		<MainLayout>
			<div className={`flex justify-center flex-col`}>
				<SliderProduct />
				<BannerProduct />
				<div className="box-border pb-14 px-24 mt-8">
					<div className="flex flex-col items-center box-border px-36">
						<h2 className="h-28 box-border py-12 not-italic text-2xl font-bold uppercase">Bộ sưu tập mới</h2>
						<div className="border-b-4 border-primary w-1/12"></div>
						<div className="flex mt-12">
							<button
								className={`py-2.5 px-4 rounded border ${valueSelectOption === 'All category' ? 'bg-primary text-white' : 'hover:bg-gray-300'}`}
								onClick={(e) => handleSelect(e, 'All category')}
							>
								Tất cả
							</button>
							{categoryList && categoryList.map(category => (
								<button
									key={category._id}
									onClick={(e) => handleSelect(e, category._id)}
									className={`py-2.5 px-4 rounded border ${valueSelectOption === category._id ? 'bg-primary text-white' : 'hover:bg-gray-300'}`}
								>
									{category.title}
								</button>
							))}
						</div>
						<div className="flex space-x-4 items-center mt-4">
							<h2>Sắp xếp</h2>
							<SortButton
								label="Giá thấp đến cao"
								onClick={() => sortProductsByPrice(PRICE_MIN_TO_MAX)}
								active={sortBy === PRICE_MIN_TO_MAX}
							/>
							<SortButton
								label="Giá cao đến thấp"
								onClick={() => sortProductsByPrice(PRICE_MAX_TO_MIN)}
								active={sortBy === PRICE_MAX_TO_MIN}
							/>
							<SortButton
								label="Từ a đến z"
								onClick={() => sortProductsByName(NAME_A_TO_Z)}
								active={sortBy === NAME_A_TO_Z}
							/>
							<SortButton
								label="Từ z đến a"
								onClick={() => sortProductsByName(NAME_Z_TO_A)}
								active={sortBy === NAME_Z_TO_A}
							/>
						</div>
						<div className="grid grid-cols-productCol gap-4 py-6">
							{productOfCategories?.map((product, index) => (
								<div
									key={index}
									className="relative flex flex-col items-center justify-center p-4 border border-gray-200 rounded shadow-md transition-transform duration-300 hover:cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-primary"
									onClick={() => handleDetailProductId(product._id)}
								>
									<img src={product.image} className="w-full mb-2" alt={product.name} />
									<span className="text-center font-semibold hover:text-icon cursor-pointer">{product.name}</span>
									<span className="text-center text-second font-semibold">{convertToVietnameseDong(product.price)}</span>
								</div>
							))}
						</div>
					</div>
				</div>
				<CountDown targetDate="2024-05-25T23:59:59"/>
				<div className="flex justify-center items-center flex-col">
					<h3 className="h-28 box-border py-12 not-italic text-2xl font-bold upnpm percase mt-4">Sản phẩm bán chạy</h3>
					<div className="border-b-4 border-primary w-1/12"></div>
					<div className="grid grid-cols-productCol gap-4 py-6">
						{topSellingProducts?.map((product, index) => (
							<div
								key={index}
								className="relative flex flex-col items-center justify-center p-4 border border-gray-200 rounded shadow-md transition-transform duration-300 hover:cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-primary"
								onClick={() => handleDetailProductId(product._id)}
							>
								<img src={product.image} className="w-full mb-2" alt={product.name} />
								<span className="text-center font-semibold hover:text-icon cursor-pointer">{product.name}</span>
								<span className="text-center text-second font-semibold">{convertToVietnameseDong(product.price)}</span>
							</div>
						))}
					</div>
				</div>
				<BenefitProduct />
				<div>
					<div className="flex flex-col items-center box-border px-36">
						<h3 className="h-28 box-border py-12 not-italic text-2xl font-bold upnpm percase mt-4">Các bài viết hay</h3>
						<div className="border-b-4 border-primary w-1/12"></div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
							{articles?.map((article, index) => (
								<div key={index} className="flex flex-col items-center text-center border rounded p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
									<a href={article.link}>
										<img src={article.image}  className="w-full h-48 object-cover mb-4 rounded" />
										<p className="text-gray-600">{article.description}</p>
									</a>
								</div>
							))}
						</div>
					</div>
					<div className="flex items-center bg-accent h-28 justify-between mt-8 box-border px-36">
						<div>
							<span className="text-2xl font-semibold">Nhập Email</span>
							<p className="font-medium opacity-85 text-sm">Để nhận thêm nhiều bài viết hay</p>
						</div>
						<div>
							<input
								className="border border-gray-300 p-2 focus:border-primary w-96"
								type="email"
								placeholder="Email"
							/>
							<button className="bg-primary text-white px-4 py-2 hover:opacity-85">
								Đăng ký
							</button>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Home;
