import React, { useEffect, useState } from 'react';
import MainLayout from "../../../container/user/MainLayout";
import { useGetListProductQuery } from "../../../services/product";
import BannerProduct from "../../../components/Banner/BannerProduct";
import { useGetListCategoriesQuery } from "../../../services/categories";
import MenuAction from "../../../components/Elements/MenuActions/MenuAction";
import InputSearch from "../../../components/Elements/Search/InputSearch";
import { convertToVietnameseDong } from "../../../utils/help";
import { useNavigate } from "react-router-dom";
import {LABEL_SORT, ROUTER_INIT} from "../../../config/constant";
import FacebookMsg from "../FacebookMsg";
import MyButton from "../../../components/Elements/Button/MyButton";
import SortButton from "../../../components/Elements/Button/SortButton";

const Home = () => {
	const { data: productList } = useGetListProductQuery();
	const bannerImage = productList?.map(product => ({ product: product.image}));
	const { data: categoryList } = useGetListCategoriesQuery();
	const [valueSelectOption, setValueSelectOption] = useState('');
	const [productOfCategories, setProductOfCategories] = useState(productList);
	const [valueInput, setValueInput] = useState('');
	const navigate = useNavigate();
	const [sortBy, setSortBy] = useState(null);
	const {NAME_A_TO_Z, NAME_Z_TO_A, PRICE_MAX_TO_MIN, PRICE_MIN_TO_MAX} = LABEL_SORT;

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
				return nameA.localeCompare(nameB)
			} else if(sortOrder === NAME_Z_TO_A) {
				return nameB.localeCompare(nameA)
			}
			return 0;
		});
		setProductOfCategories(sortedProducts);
		setSortBy(sortOrder);
	}

	const handleDetailProductId = (index) => {
		navigate(`${ROUTER_INIT.PRODUCT}/${index}`)
	}

	return (
		<MainLayout>
			<div className={`flex justify-center`}>
				<div>
					<BannerProduct bannerImage={bannerImage} />
					<div className="box-border px-36">
						<h2 className="h-32 box-border py-12 not-italic text-3xl font-bold">New Arrivals</h2>
						<div className="border-b-4 border-primary w-1/12">
							<span>Danh mục</span>
							{categoryList && categoryList.map(category => (
								<button key={category._id} onClick={handleSelect} className="flex flex-col items-center justify-center w-full py-2.5 hover:bg-gray-300 rounded-lg">
									{category.title}
								</button>
							))}
						</div>
						<div className="w-full">
							<InputSearch setValueInput={setValueInput} />
						</div>
						<div className="flex space-x-4 items-center">
							<h2>Sắp xếp</h2>
							<SortButton
								label="Giá thấp đến cao"
								onClick={() => sortProductsByPrice(PRICE_MIN_TO_MAX)} active={sortBy === PRICE_MIN_TO_MAX}
							/>
							<SortButton
								label="Giá cao đến thấp"
								onClick={() => sortProductsByPrice(PRICE_MAX_TO_MIN)} active={sortBy === PRICE_MAX_TO_MIN}
							/>
							<SortButton
								label="Từ a đến z"
								onClick={() => sortProductsByName(NAME_A_TO_Z)} active={sortBy === NAME_A_TO_Z}
							/>
							<SortButton
								label="Từ z đến a"
								onClick={() => sortProductsByName(NAME_Z_TO_A)} active={sortBy === NAME_Z_TO_A} />
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
			</div>
		</MainLayout>
	);
};

export default Home;
