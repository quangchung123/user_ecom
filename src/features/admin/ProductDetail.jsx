import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetDetailProductQuery} from "../../services/product";
import TableDetail from "../../components/Table/TableDetail";
import {columnDetailProduct} from "../../config";
import styles from "./Admin.module.scss";
import MyButton from "../../components/Elements/Button/MyButton";
import {ROUTER_ADMIN, ROUTER_INIT} from "../../config/constant";

const ProductDetail = () => {
		const { productId } =useParams();
		const { data } = useGetDetailProductQuery(productId);
		const navigate = useNavigate();
		const handleGoToPage = () => {
				navigate(`${ROUTER_INIT.ADMIN}/${ROUTER_ADMIN.PRODUCT}`)
		}
		return (
				<div className={styles.container}>
						<div>
								<h2 className="text-3xl font-semibold">Detail</h2>
								<MyButton onClick={handleGoToPage} styleModify={"mt-4 bg-primary py-1.5 px-2.5 rounded text-white"}>
										<i className="bi bi-arrow-left-short not-italic">
												Previous
										</i>
								</MyButton>
						</div>
						<div className={styles.content}>
								<TableDetail dataDetail={data} columnDetail={columnDetailProduct} />
						</div>
				</div>
		);
};

export default ProductDetail;