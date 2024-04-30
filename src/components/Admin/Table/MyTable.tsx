import React, {useEffect, useMemo, useState} from 'react';
import { ColumnDef } from '@tanstack/react-table';
import TableResponse from '@/components/Core/Table/TableResponse';
import useApiTable from '@/hooks/useApiTable';
import { useDispatch } from 'react-redux';
// @ts-ignore
import ResponsivePagination from 'react-responsive-pagination';
import popupSlice from "@/services/storage/popupSlice";
import {useGetInfoShopQuery, useUpdateStatusShopMutation} from "@/services/api/adminApi";
import {EActions, ELevelUser, EPopup, EStatusShop} from "@/types/enum";
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";
import get from "lodash.get";
import ItemShop from "@/components/Admin/Popup/Item/ItemShop";
import {useAppSelector} from "@/store";
import MyPopup from "@/components/Admin/Popup/MyPopup";
import MenuAction from "@/components/Core/Table/MenuAction";
import {handleCheckPayload, handleModal, handleSelectedData} from "@/utils/help";
import {actions} from "@/config/constant";

type DataShop = {
    avatar: string;
    name: string;
    business: string;
    code: string;
    products: [{}];
    phone_number: string;
    location: {};
    id: number;
};

function App() {
    const dispatch = useDispatch();
    const selectedTabId = useAppSelector((state) => state.tab.tabId);
    useEffect(() => {
        dispatch(popupSlice.actions.popup([]))
    }, [selectedTabId]);
    const dataPayload = useMemo(() => handleCheckPayload(selectedTabId),[selectedTabId]);
    const {data,isSuccess} = useGetInfoShopQuery({level:ELevelUser.Shop, status: dataPayload});
    const dataShop =useMemo(()=>get(data,'data.data') || [],[data,isSuccess]);
    const [updateInfoPayment] = useUpdateStatusShopMutation();
    const ref = useApiTable<DataShop>({
        avatar: 'xs',
        name: 'sm',
        business: 'md',
        code: 'xl',
        products: 'xl',
        phone_number: 'md',
        location: 'md'
    });
    const defaultColumns: ColumnDef<DataShop>[] = [
        {
            accessorKey: 'avatar',
            header: () => <span>Avatar</span>,
            cell: (info) =>  <ImagePlacerHolder value={`${info.getValue()}`} className={"image-table"}/>,
        },
        {
            accessorFn: (row) => row.name,
            id: 'name',
            cell: (info) => info.getValue(),
            header: () => <span>Tên Shop</span>,
        },
        {
            accessorKey: 'business',
            id: 'business',
            cell: (info) => info.getValue(),
            header: () => <span>Nghành nghề</span>,
        },
        {
            accessorKey: 'code',
            cell: (info) => info.getValue(),
            header: () => 'Doanh thu',
        },
        {
            accessorKey: 'total_product',
            id: 'products',
            cell: (info) => info.getValue<number>(),
            header: () => <span>Tổng sản phẩm</span>,
        },
        {
            accessorKey: 'phone_number',
            cell: (info) => info.getValue(),
            header: () => 'Số điện thoại',
        },
        // {
        //     accessorKey: 'location',
        //     cell: (info) => `${info.getValue<{id:number}>().street} ,${info.getValue<any>().commune} ,${info.getValue<any>().district} ${info.getValue<any>().city}`,
        //     header: () => 'Địa Chỉ',
        // },
        {
            accessorKey: 'id',
            header: '',
            size: 100,
            cell: (info) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const selectIdTab = useAppSelector((state) => state.tab.tabId);
                const handleGetItem = (e: any) => {
                    const idItem: any = info.getValue();
                    const dataSetPopup = EPopup.Shop;
                    handleSelectedData(updateInfoPayment, e, idItem, dispatch, dataSetPopup);
                };

                return (
                    selectIdTab === 1 ? (
                        <MenuAction data={actions} onItemClick={handleGetItem} />
                        ) : (
                        <button onClick={handleGetItem}>
                            <i className="bi bi-info-circle"></i>
                        </button>
                    )
                );
            },
        },
    ];
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (page: any) => {
        setCurrentPage(page);
        if (ref.current) {
            ref.current.table.setPageIndex(page - 1);
        }
    };
    const selectIdPopup = useAppSelector((state) => state.popup.popupId);

    return (
        <div className="p-2">
            <div>
                <MyPopup popupId={"Shop"}>
                    <ItemShop/>
                </MyPopup>
                <TableResponse<DataShop> reference={ref} columns={defaultColumns} data={dataShop}>
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

export default function MyTable() {
    return <App />;
}
