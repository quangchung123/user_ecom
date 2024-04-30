import React, {useEffect, useMemo, useState} from 'react';
import { ColumnDef } from '@tanstack/react-table';
import TableResponse from '@/components/Core/Table/TableResponse';
import useApiTable from '@/hooks/useApiTable';
import { useDispatch } from 'react-redux';
// @ts-ignore
import ResponsivePagination from 'react-responsive-pagination';
import popupSlice from "@/services/storage/popupSlice";
import {useGetInfoOrderQuery, useGetInfoShopQuery} from "@/services/api/adminApi";
import {EActions, ELevelUser, EPayment, EPopup, EStatusOrder} from "@/types/enum";
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";
import get from "lodash.get";
import ItemShop from "@/components/Admin/Popup/Item/ItemShop";
import {useAppSelector} from "@/store";
import MyPopup from "@/components/Admin/Popup/MyPopup";
import InfoProduct from "@/components/Admin/Order/InfoProduct";
import {InfoSellerOrder} from "@/components/Admin/Order/InfoSellerOrder";
import MenuAction from "@/components/Core/Table/MenuAction";
import ItemOrder from "@/components/Admin/Popup/Item/ItemOrder";
import {log} from "util";
import {convertToVietnameseDong, handleCheckPayload} from "@/utils/help";
import {InfoShopOrder} from "@/components/Admin/Order/InfoShopOrder";
import {actions} from "@/config/constant";

type DataOrder = {
    products:  { [key: string]: string };
    commission: number;
    amount: number;
    status: string;
    user:  { [key: string]: string };
    shop: { [key: string]: string };
};

function App() {
    const dispatch = useDispatch();
    const selectIdTab = useAppSelector((state) => state.tab.tabId);
    useEffect(() => {
        dispatch(popupSlice.actions.popup([]))
    }, [selectIdTab]);
    const dataPayload = useMemo(() =>handleCheckPayload(selectIdTab),[selectIdTab]);
    const {data,isSuccess} = useGetInfoOrderQuery({status : dataPayload});
    let dataOrder =useMemo(()=>get(data,'data.data') || [],[data,isSuccess]);
     dataOrder = dataOrder.map((item) => (
        {
            ...item,
            commission: item.current_product.commission * item.current_product.price * item.current_commission_seller.percent
        }
    ))
    // const dataTest = dataAmount.map((data) => data.amount);
    const ref = useApiTable<DataOrder>({
        products: 'xs',
        commission: 'md',
        amount: 'xl',
        status: 'xl',
        user: 'xl',
        shop: 'xl',

    });

    const defaultColumns: ColumnDef<DataOrder>[] = [

        {
            accessorKey: 'current_product',
            id: 'products',
            header: () => <span className={"text-sm"}>Sản phẩm</span>,
            cell: (info) =>
                <InfoProduct value={info.getValue()}/>,
            size: 120

        },
        {
            accessorKey: 'commission',
            header: () => <span className={"text-sm"}>Hoa hồng</span>,
            cell: (info) =>
                convertToVietnameseDong(info.getValue()),
            size: 60
        },
        {
            accessorKey: 'amount',
            header: () => <span className={"text-sm"}>Số lượng</span>,
            cell: (info) => info.getValue(),
            size: 60

        },
        {
            accessorFn: (row) => row.status,
            id: 'status',
            cell: (info) => info.getValue() === 'WAIT' ? 'Hàng đợi' : (info.getValue() === 'REJECT') ? 'Từ chối' : '',
            header: () => <span className={"text-sm"}>Trạng thái</span>,
            size: 70
        },

        {
            accessorKey: 'user',
            id: 'user',
            header: () => <span className={"text-sm"}>Thông tin người mua</span>,
            cell: (info) => <InfoSellerOrder value={info.getValue()}/>
        },
        {
            accessorKey: 'shop',
            id: 'shop',
            header: () => <span className={"text-sm"}>Thông tin Shop</span>,
            cell: (info) => <InfoShopOrder value={info.getValue()}/>
        },
        {
            accessorKey: 'id',
            header: '',
            size: 50,
            cell: (info) => {
// eslint-disable-
                const handleGetItem = (e: any) => {
                    const idItem: number =  info.getValue();
                    if(e.value == EActions.Detail || e.value == null) {
                        dispatch(popupSlice.actions.popup({
                            popupId: [EPopup.Order],
                            data: idItem,
                        }))
                    } else if(e.value == EActions.Accept) {
                        alert("OK");
                        // handleModal(updateInfoPayment, idItem, "OK");
                    } else if(e.value == EActions.Reject) {
                        alert("REJECT");
                        // handleModal(updateInfoPayment, idItem, "REJECT");
                    }
                };

                return (
                    <MenuAction data={actions} onItemClick={handleGetItem} />
                );
            },
        },
    ];
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (page: any) => {
        setCurrentPage(page);
        if (ref.current) {
            console.log('ref.current', ref.current);
            ref.current.table.setPageIndex(page - 1);
        }
    };
    const selectIdPopup = useAppSelector((state) => state.popup.popupId);

    return (
        <div className="p-2">
            <div>
                <MyPopup popupId={"Order"}>
                    <ItemOrder/>
                </MyPopup>
                <TableResponse<DataOrder> reference={ref} columns={defaultColumns} data={dataOrder}>
                    <ResponsivePagination
                        className={'pagination justify-content-end my-5 space-x-1.5'}
                        total={100}
                        current={currentPage}
                        onPageChange={handleChangePage}
                        maxWidth={320}
                    />
                </TableResponse>
            </div>
        </div>
    );
}

export default function MyTableOrder() {
    return <App />;
}
