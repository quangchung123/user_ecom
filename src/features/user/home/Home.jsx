import React, { useEffect, useState } from 'react';
import MainLayout from "../../../container/user/MainLayout";
import { useGetListProductQuery } from "../../../services/product";
import BannerProduct from "../../../components/Banner/BannerProduct";
import { useGetListCategoriesQuery } from "../../../services/categories";
import MenuAction from "../../../components/Elements/MenuActions/MenuAction";
import InputSearch from "../../../components/Elements/Search/InputSearch";
import {convertToVietnameseDong} from "../../../utils/help";
import {useNavigate} from "react-router-dom";
import {ROUTER_INIT} from "../../../config/constant";
import FacebookMsg from "../FacebookMsg";

const Home = () => {
	const { data: productList } = useGetListProductQuery();
	const bannerImage = productList?.map(product => ({ product: product.image }));
	const { data: categoryList } = useGetListCategoriesQuery();
	const [valueSelectOption, setValueSelectOption] = useState('');
	const [productOfCategories, setProductOfCategories] = useState(productList);
	const [valueInput, setValueInput] = useState('');
	const navigate = useNavigate();

	const handleSelect = (event) => {
		setValueSelectOption(event.target.value);
	};

	useEffect(() => {
		let filteredProducts = productList;
		if (valueSelectOption && valueSelectOption !== "All category") {
			filteredProducts = productList?.filter((products) => products.categories === valueSelectOption);
		}
		const dataFiltered = filteredProducts?.filter((item) => item.name.toLowerCase().includes(valueInput.toLowerCase()));
		setProductOfCategories(dataFiltered);
	}, [valueSelectOption, productList, valueInput]);
	const handleMinToMaxPriceChange = () => {
		const sortedProducts = [...productOfCategories].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
		setProductOfCategories(sortedProducts);
	};

	const handleMaxToMinPriceChange = () => {
		const sortedProducts = [...productOfCategories].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
		setProductOfCategories(sortedProducts);
	};

	const handleDetailProductId = (index) => {
		navigate(`${ROUTER_INIT.PRODUCT}/${index}`)
	}
	const listActionIconProduct = [
		{
			key: 1,
			title: 'Thấp đến cao',
			handleRowAction: handleMinToMaxPriceChange,
		},
		{
			key: 2,
			title: 'Cao đến thấp',
			handleRowAction: handleMaxToMinPriceChange,
		},
	];

	return (
		<MainLayout>
			<div className="flex justify-center flex-col items-center bg-white">
				<BannerProduct bannerImage={bannerImage} />
				<div className="box-border px-36">
					<h2 className="h-32 box-border py-12 not-italic text-3xl font-bold">New Arrivals</h2>
					<div className="border-b-4 border-primary w-1/12"></div>
					<div className="w-full">
						<InputSearch setValueInput={setValueInput} />
					</div>
					<div className="flex justify-start w-full">
						<select onChange={handleSelect} className="border py-1.5 rounded px-5 border-slate-300 h-10 mr-10">
							<option>All category</option>
							{categoryList && categoryList.map(category => (
								<option key={category._id}>{category.title}</option>
							))}
						</select>
						<MenuAction data={listActionIconProduct} title={"Sắp xếp"} />
					</div>
					<div className="grid grid-cols-productCol gap-4 py-6">
						{productOfCategories?.map((product, index) => (
							<div
								key={index}
								className="relative flex flex-col items-center justify-center p-4 border border-gray-200 rounded shadow-md transition-transform duration-300 hover:cursor-pointer hover:shadow-lg hover:-translate-y-1"
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
			{/*<FacebookMsg />*/}
		</MainLayout>
	);
};

export default Home;
