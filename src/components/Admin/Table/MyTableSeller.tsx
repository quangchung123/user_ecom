import React, {useEffect, useMemo, useState} from 'react';
import { ColumnDef } from '@tanstack/react-table';
import TableResponse from '@/components/Core/Table/TableResponse';
import useApiTable from '@/hooks/useApiTable';
import { useDispatch } from 'react-redux';
// @ts-ignore
import ResponsivePagination from 'react-responsive-pagination';
import {IBodyResponse, IDataAction} from '@/types';
import popupSlice from "@/services/storage/popupSlice";
import {useGetInfoShopQuery} from "@/services/api/adminApi";
import {ELevelUser, EPopup} from "@/types/enum";
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";
import get from "lodash.get";
import ItemShop from "@/components/Admin/Popup/Item/ItemShop";
import {useAppSelector} from "@/store";
import MyPopup from "@/components/Admin/Popup/MyPopup";
// impo

type DataShop = {
    avatar: string;
    name: string;
    code: string;
    products: [{}];
    phone_number: string;
    location: {};
    id: number;
};

function App() {
    const dispatch = useDispatch();
    const selectIdTab = useAppSelector((state) => state.tab.tabId);
    useEffect(() => {
        dispatch(popupSlice.actions.popup([]))
    }, [selectIdTab]);
    const dataPayload = (selectIdTab === 1) ? ELevelUser.Bd : ELevelUser.Bdm
    const {data,isSuccess} = useGetInfoShopQuery({level: dataPayload});
    const dataShop =useMemo(()=>get(data,'data.data') || [],[data,isSuccess]);

    const ref = useApiTable<DataShop>({
        avatar: 'xs',
        name: 'md',
        products: 'xl',
        phone_number: 'xl',
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
            header: () => <span>Tên SELLER</span>,
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
        {
            accessorKey: 'action',
            header: '',
            size: 50,
            cell: (info) => {
                const handleGetItem = (e: any) => {
                    dispatch(popupSlice.actions.popup({
                        popupId: [EPopup.Shop],
                        data: info.row.original.id
                    }))
                };

                return (
                    <button onClick={handleGetItem}>
                        <i className="bi bi-info-circle"></i>
                    </button>
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

export default function MyTableSeller() {
    return <App />;
}
